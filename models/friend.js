const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  friend: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
});

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;
