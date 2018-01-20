const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  email: { type: String, required: true},
  publicView: { type: Boolean, required: true }
});

module.exports = mongoose.model('Note', noteSchema);