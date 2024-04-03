const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: String,
    userId: { type: String, required: true },
    // Additional fields as needed, such as timestamp, username, etc.
  }, { timestamps: true });
  
const commentSchema = new mongoose.Schema({
  recipeId: { 
    type: String, 
    ref: 'Recipe', 
    require: true
},
  text: String,
  userEmail: String,
    replies: [replySchema]
});

module.exports = mongoose.model('Comment', commentSchema);
