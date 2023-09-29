const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThoughtSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
