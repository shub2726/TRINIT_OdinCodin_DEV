const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");

router.post("/register", async(req, res) => {
    const { username, email, password, firstname, lastname, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email : email });
        const existingUsername = await User.findOne({username: username});
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        if (existingUsername) {
            return res.status(400).json({message: "Username already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: email,
            phone: phone,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;