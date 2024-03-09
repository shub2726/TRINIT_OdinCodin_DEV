const router = require('express').Router();
const User = require('../models/User');
const Group = require('../models/Group');
const GroupMessage = require('../models/GroupMessage')

router.post("/new-message",async(req,res) => {
    try{
        const NGM = new GroupMessage({
            GroupID:req.body.GroupID,
            postedBy:req.body.userID,
            content:req.body.message
        })

        const result = await NGM.save();
        // console.log(result)
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.post("/get-message",async (req,res) => {
    try{
        const result = await GroupMessage.find({GroupID:req.body.GroupID}).populate('postedBy')
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;