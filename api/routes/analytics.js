const Analytics = require('../models/Analytics');
const Paper = require('../models/Paper');
const router = require('express').Router();

router.post('/submit-paper/', async (req, res) => {
    try {
      const { userId, paperId, userAnswers, timeWasted, totalScore, scorePerQuestion } = req.body;
    
        let userAnswersLetters = []

        userAnswersLetters.push('u')
        for (let i = 1; i < userAnswers.length; i++) {
            if (userAnswers[i] == '1') {
                userAnswersLetters.push('a')
            } else if (userAnswers[i] == '2') {
                userAnswersLetters.push('b')
            } else if (userAnswers[i] == '3') {
                userAnswersLetters.push('c')
            } else if (userAnswers[i] == '4') {
                userAnswersLetters.push('d')
            } else {
                userAnswersLetters.push('u');
            }
        }

        let score = 0;

        const paper = await Paper.findOne({ _id: paperId });

        if (!paper) {
        return res.status(404).json({ error: 'Paper not found' });
        }

        const questions = paper.questions;

        for (let i = 0; i < userAnswersLetters.length; i++) {
            if (userAnswersLetters[i] === questions[i].ansval) {
                score += 4;
            } else if (userAnswersLetters[i] === 'u') {
                score += 0;
            } else {
                score -= 1;
            }
        }

      const newAnalytics = new Analytics({
        userId: userId,
        paperId: paperId,
        userAnswers: userAnswersLetters,
        timeWasted: timeWasted,
        totalScore: score,
        scorePerQuestion: scorePerQuestion,
      });
  
      const savedAnalytics = await newAnalytics.save();
  
      res.json(savedAnalytics);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;
