const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  //userId: { type: String, required: true },
  noteId: { type: String, required: true },
  userEmail: { type: String, required: true },
  content: { type: String, require: true}
});

module.exports = mongoose.model('Comment', commentSchema);