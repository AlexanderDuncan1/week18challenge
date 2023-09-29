const User = require('../models/user');

exports.addFriend = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.body.friendId;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) return res.status(404).json({ error: 'User not found' });

        if (user.friends.includes(friendId)) return res.status(400).json({ error: 'Already friends' });

        user.friends.push(friendId);
        await user.save();

        res.status(201).json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFriend = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.body.friendId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const index = user.friends.indexOf(friendId);
        if (index === -1) return res.status(400).json({ error: 'Not friends' });

        user.friends.splice(index, 1);
        await user.save();

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listFriends = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('friends', 'username email');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user.friends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
