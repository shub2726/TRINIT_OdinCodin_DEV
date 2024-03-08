const router = require('express').Router();
const Paper = require('../models/Paper');


router.post("/create-paper",async (req, res) => {
    try{
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

        console.log(questionFormat)

        const time = Number(req.body.timelimit);
        const Private = true;

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
    }
    catch(error){
        console.log(error)
        res.status(500).json(error);
    }
})


// router.get("/getAllPapers/:filter", async (req, res) => {
//     try {
        

//         const newQuestion = new Question({
//             questionText: req.body.questionText,
//             questionImage: req.body.questionImage,
//             options: req.body.options,
//             subject: req.body.subject
//         });

//         const que = await newQuestion.save();
//         res.status(200).json(que);
//     } catch (error) {
//        res.status(500).json(error);
//     }
// })


module.exports = router;