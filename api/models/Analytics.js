const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    paperId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Paper',
    },
    userAnswers: [],
    timeWasted: [],
    totalScore: Number,
    scorePerQuestion: [],
});

module.exports = mongoose.model("Analytics", analyticsSchema);