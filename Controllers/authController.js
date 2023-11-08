const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const router = express.Router();

// Dummy in-memory database (for demonstration purposes)
const users = [];

// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id }, 'My-Store-Managment-KEYSECRET', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// Logout endpoint (this usually requires frontend handling to remove the token from storage or headers)
router.post('/logout', (req, res) => {
    // This is a placeholder, as JWTs are stateless and logging out usually means discarding the token client-side.
    res.status(200).send('Logged out successfully');
});

module.exports = router;
