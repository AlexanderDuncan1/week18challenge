const Thought = require('../models/thought');

exports.listThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('author', 'username');
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createThought = async (req, res) => {
    try {
        const { content, authorId } = req.body;
        const thought = new Thought({ content, author: authorId });
        await thought.save();
        res.status(201).json(thought);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getThoughtById = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const thought = await Thought.findById(thoughtId).populate('author', 'username');
        if (!thought) return res.status(404).json({ error: 'Thought not found' });
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const { content } = req.body;
        const thought = await Thought.findById(thoughtId);
        if (!thought) return res.status(404).json({ error: 'Thought not found' });
        thought.content = content;
        await thought.save();
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteThought = async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const thought = await Thought.findById(thoughtId);
        if (!thought) return res.status(404).json({ error: 'Thought not found' });
        await thought.remove();
        res.status(204).json({ message: 'Thought deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
