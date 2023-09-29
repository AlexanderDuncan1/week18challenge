const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) return res.status(400).json({ error: 'Username or Email already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid Username or Password' });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ error: 'Invalid Username or Password' });
        res.status(200).json({ message: 'Logged in successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId, '-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

