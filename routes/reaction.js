const express = require('express');
const ReactionController = require('../controlmethod/ReactionController.js');
const router = express.Router();

router.post('/:thoughtId', ReactionController.createReaction);
router.delete('/:reactionId', ReactionController.deleteReaction);
router.get('/:thoughtId', ReactionController.listReactions);

module.exports = router;
