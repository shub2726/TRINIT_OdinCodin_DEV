const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
    GroupID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group'
    },
    content:{
        type:String,
        required:true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("GroupMessage", groupMessageSchema);