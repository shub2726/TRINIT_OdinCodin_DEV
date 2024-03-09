const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    questionImage: {
        type: String,
    },
    options: {
        type: [],
    },
    optionImages: {
        type: [String],
    },
    ansVal: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Question", questionSchema);