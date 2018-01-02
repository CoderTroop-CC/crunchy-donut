let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// note schema
let noteSchema = new Schema({
  name: {
      type: String,
      required: true,
  },
  content: {
      type: String,
      required: true,
  },
  user: {
      type: String,
      required: true
  }
});


// create a model
let User = mongoose.model('Note', noteSchema);

module.exports = Note;