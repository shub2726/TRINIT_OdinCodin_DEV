const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get("/getUsers", async (req, res) => {
    try {
        let query = {};
        const currentUserID = req.query.userID; // Extract the userID from the query parameters

        if (req.query.search) {
            // Construct a regex pattern to search for username, first name, or last name
            const searchPattern = new RegExp(req.query.search, "i");
            query.$or = [
                { username: { $regex: searchPattern } },
                { firstName: { $regex: searchPattern } },
                { lastName: { $regex: searchPattern } }
            ];
        }
        
        // Retrieve the current user's friends array from the database
        const currentUser = await User.findById(currentUserID);
        const friends = currentUser.friends;

        // Exclude the current user and their friends from the query
        query._id = { $nin: [currentUserID, ...friends] };

        const users = await User.find(query).limit(4);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/sendFriendRequest/:userId", async (req, res) => {
    const { userId } = req.params;
    const { senderId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(userId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        if (sender.sentRequests.includes(receiver._id) || receiver.pendingRequests.includes(sender._id)) {
            return res.status(400).json({ message: "Friend request already sent" });
        }

        sender.sentRequests.push(receiver._id);
        receiver.pendingRequests.push(sender._id);

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/declineFriendRequest/:userId", async (req, res) => {
    const { userId } = req.params;
    const { senderId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(userId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        receiver.sentRequests = receiver.sentRequests.filter(id => id.toString() !== senderId);
        sender.pendingRequests = sender.pendingRequests.filter(id => id.toString() !== userId);

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Friend request declined successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/acceptFriendRequest/:userId", async (req, res) => {
    const { userId } = req.params;
    const { senderId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(userId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        receiver.pendingRequests = receiver.pendingRequests.filter(id => id.toString() !== senderId);
        sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== userId);
        receiver.friends.push(senderId);
        sender.friends.push(userId);

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/getFriends", async (req, res) => {
    try {
      const currentUserID = req.query.userID;
      const currentUser = await User.findById(currentUserID).populate("friends");
      const friends = currentUser.friends;
      res.json(friends);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  

module.exports = router;