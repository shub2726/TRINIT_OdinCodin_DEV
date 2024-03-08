const router = require('express').Router();
const Event = require('../models/Event');
const Club = require('../models/Clubs');
const User = require('../models/User');
const Paper = require('..model/Paper');
const Question = require('../models/Question')
const CustomEvent = require("../models/CustomEvent")

//create a question
router.post("/create-question", async (req, res) => {
    try {
        

        const newQuestion = new Question({
            questionText: req.body.questionText,
            questionImage: req.body.questionImage,
            options: req.body.options,
            subject: req.body.subject
        });

        const que = await newQuestion.save();
        res.status(200).json(que);
    } catch (error) {
       res.status(500).json(error);
    }
})


module.exports = router;