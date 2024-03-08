const router = require('express').Router();
const Event = require('../models/Event');
const Club = require('../models/Clubs');
const User = require('../models/User');
const Paper = require('..model/Paper');
const Question = require('../models/Question')
const CustomEvent = require("../models/CustomEvent")

router.post("/create-paper",async (req, res) => {
    try{
        const newPaper = new Paper({
            userId: req.body.userId,
            paperTitle: req.body.paperTitle,
            timelimit: req.body.timelimit,
            Private: req.body.Private,
        })

        const paper = await newPaper.save();
        res.status(200).json(que);
    }
    catch(error){
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