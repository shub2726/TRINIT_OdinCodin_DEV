const router = require('express').Router();
const Paper = require('../models/Paper');


router.post("/create-paper", async (req, res) => {
    try {
        const allQuestions = req.body.questions;

        const questionFormat = allQuestions.map(question => {
            const { question: questionText, options } = question;

            const optionsWithImage = options.map(option => ({
                ...option,
                image: null,
            }));

            return {
                ...question,
                questionImage: null,
                options: optionsWithImage,
                ansVal: null,
            };
        });

        const time = Number(req.body.timelimit);
        let Private = true;

        if (req.body.Private == 2) {
            Private = false;
        }

        const newPaper = new Paper({
            userId: req.body.userId,
            paperTitle: req.body.paperTitle,
            TimeLimit: time,
            Private: Private,
            questions: questionFormat
        })

        const paper = await newPaper.save();
        console.log("Success")
        res.status(200).json("A new paper has been created!");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})


router.get("/getPapers/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const papers = await Paper.find({ userId: id })
        res.status(200).json(papers);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put("/update-paper/:paperId", async (req, res) => {
    try {
        const { paperId } = req.params;
        const updatedFields = req.body;

        const updatedPaper = await Paper.findByIdAndUpdate(
            paperId,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedPaper) {
            return res.status(404).json({ error: 'Paper not found' });
        }

        res.status(200).json(updatedPaper);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;