const Reaction = require('../models/reaction');

exports.createReaction = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const { userId, type } = req.body;
        
        const reaction = new Reaction({
            thought: thoughtId,
            user: userId,
            type: type,
        });
        
        await reaction.save();
        res.status(201).json(reaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReaction = async (req, res) => {
    try {
        const reactionId = req.params.reactionId;
        
        const reaction = await Reaction.findById(reactionId);
        if (!reaction) return res.status(404).json({ error: 'Reaction not found' });
        
        await reaction.remove();
        res.status(204).json({ message: 'Reaction removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listReactions = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        
        const reactions = await Reaction.find({ thought: thoughtId }).populate('user', 'username');
        res.status(200).json(reactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
