const Analytics = require('../models/Analytics');
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

        

      const newAnalytics = new Analytics({
        userId: userId,
        paperId: paperId,
        userAnswers: userAnswersLetters,
        timeWasted: timeWasted,
        totalScore: totalScore,
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
