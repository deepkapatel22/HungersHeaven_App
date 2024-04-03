const mongoose = require('mongoose');
const Recipe = require('./Recipe');

const likeSchema = new mongoose.Schema({
  
  recipeId: { 
    type: String, 
    required: true,
    ref: 'Recipe'
},
    userEmail: String,
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Like', likeSchema);
