const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sharingSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  noteId: { type: String, required: true },
  sharing: { type: Boolean, required: true }
});

module.exports = mongoose.model('Sharing', sharingSchema);