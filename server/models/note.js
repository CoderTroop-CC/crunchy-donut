const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  createdDate: { type: Date, required: true },
  share: { type: Boolean, required: true }
});

module.exports = mongoose.model('Note', noteSchema);