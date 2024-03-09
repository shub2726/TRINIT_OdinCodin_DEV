const router = require('express').Router();
const User = require('../models/User');
const Group = require('../models/Group');

router.post("/get-groups", async (req,res) => {
    try{
        // console.log(req.body);
        const usr = await User.findById(req.body.userID)
        const result = await Group.find({_id:{$in:usr.memberOf}})
        res.status(200).json(result);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

router.post("/check-members",async (req,res) => {
    try{
        const result = await Group.findById(req.body.GroupID);
        if (result.users.length == 0) {res.send(false);return;}
        console.log(req.body.GroupID,result,result.users.includes(req.body.userID))
        res.send(result.users.includes(req.body.userID)).status(200)
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

router.post("/new-group", async (req,res) =>{
    try{
        console.log(req.body);
        const Ngrp = new Group({
            GroupName:req.body.GroupName,
            users:[req.body.userID]
        })

        const gr = await Ngrp.save();

        const usr = await User.findById(req.body.userID)
        const result = await usr.updateOne({$push:{memberOf:gr._id}})

        
        res.status(200).json(usr);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

router.post("/join-group",async (req,res) => {
    try{
        const grpID = req.body.grpID;
        // const grp = await Group.findById(grpID);
        // console.log(grp);
        // grp.users.push(req.body.userID);
        // res.status(500).json(grp);
        // const arr = grp.users;
        // arr.push(req.body.userID)

        const grp = await Group.findById(grpID);
        console.log(grp);
        const result = await grp.updateOne({$push:{users:req.body.userID}})
        const usr = await User.findById(req.body.userID)
        const result2 = await usr.updateOne({$push:{memberOf:grpID}})
        res.status(200).json(grp);
    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;