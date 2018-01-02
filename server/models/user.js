var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user schema
var userSchema = new Schema({
    firstname: { 
      type: String, 
      required: true, 
      unique: true 
    },
    lastname: { 
        type: String, 
        required: true, 
        unique: true 
      },
    username: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});


// create a model
var User = mongoose.model('User', userSchema);

module.exports = User;