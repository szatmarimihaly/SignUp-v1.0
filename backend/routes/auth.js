const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

// REGISTRATION
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }

    if (password.length < 12){
        return res.status(400).json({ message: "Password must be at least 12 characters long." });
    }

    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "Username already exists" });

        let emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("🔥 Error in signup:", err);  // Logoljunk ki mindent
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// LOGIN
router.post("/signin", async (req, res) => {
    const { email, password, username } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, username : user.username }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: "Server error", error : err.message });
    }
});


module.exports = router;
