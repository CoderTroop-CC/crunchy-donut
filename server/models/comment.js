const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  noteId: { type: String, required: true },
  comment: { type: String, require: true}
});

module.exports = mongoose.model('Comment', commentSchema);