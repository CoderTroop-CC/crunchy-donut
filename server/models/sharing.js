const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sharingSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  noteId: { type: String, required: true },
  collaborator: { type: Boolean, required: true }
});

module.exports = mongoose.model('Sharing', sharingSchema);