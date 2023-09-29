const express = require('express');
const FriendController = require('../controlmethod/FriendController.js');
const router = express.Router();

router.post('/:userId', FriendController.addFriend);
router.delete('/:userId', FriendController.removeFriend);
router.get('/:userId/friends', FriendController.listFriends);

module.exports = router;
