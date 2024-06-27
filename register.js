const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Registration endpoint
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists" });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        // Respond with success
        res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).send({ message: "Server error" });
    }
});

module.exports = router;
