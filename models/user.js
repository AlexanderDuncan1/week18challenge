const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
