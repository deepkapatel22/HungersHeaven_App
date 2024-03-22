const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const User = require('./User'); 


const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  }
});


const recipeSchema = new mongoose.Schema({
  // userId: { 
  //   type: String, 
  //   ref: 'User', 
  //   required: true 
  // },
  recipeId: {
    type: String,
    default: () => uuidv4().replace(/-/g, ''),
    unique: true,
    required: true
  },
  recipeName: {
    type: String,
    required: true,
    unique: false
  },
  persons: {
    type: Number,
    required: true
  },
  ingredients: [ingredientSchema],
  method: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['breakfast', 'lunch', 'dinner', 'dessert']
  },
  spiceLevel: {
    type: String,
    required: true,
    enum: ['mild', 'medium', 'hot']
  },
  type: {
    type: String,
    required: true,
    enum: ['vegetarian', 'vegan', 'meat', 'dessert'] // Add more types as necessary
  },
  cuisine: {
    type: String,
    required: true,
    // Include more cuisines as necessary. Ensure they match the options in your form.
    enum: ['italian', 'mexican', 'indian', 'chinese', 'japanese', 'french']
  },
  images: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Optionally add this if you want to track when recipes are created or modified
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
