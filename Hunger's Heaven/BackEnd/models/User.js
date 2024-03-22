  const mongoose = require('mongoose');
  const { v4: uuidv4 } = require('uuid')
  const userSchema = new mongoose.Schema({
    userId: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
      unique: true,
      required: true
    },
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phno: {
      type: String,
      required: false // Assuming phone number is optional
    },
    password: {
      type: String,
      required: true
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;