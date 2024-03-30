const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Adjust the path as per your structure
const User = require('../models/User');
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
  console.log('POST request to /api/recipes received');
  try {
    const recipe = new Recipe({
      // userId: req.body.userId,
      recipeName : req.body.recipeName,
      persons : req.body.persons,
      ingredients : req.body.ingredients,
      method : req.body.method,
      category: req.body.category,
      spiceLevel : req.body.spiceLevel,
      type: req.body.type,
      cuisine: req.body.cuisine,
      images: req.body.images,
      created: req.body.created,
    });
    console.log(recipe);
    await recipe.save();
    console.log("saved");
    res.json({
      success: true,
      recipeName: req.body.recipeName,
    }); 

  } catch (error) {
    res.status(400).send(error.message);
  }
});



router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log(recipes);
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

router.get('/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  console.log(`Fetching recipe with ID: ${recipeId}`);
  
  try {
    const recipe = await Recipe.findOne({recipeId: recipeId});
    console.log('Query result:', recipe);

    if (!recipe) {
      console.log(`Recipe with ID ${recipeId} not found.`);
      return res.status(404).send('Recipe not found');
    }
    
    res.json(recipe);
  } catch (error) {
    console.error(`Error fetching recipe with ID ${recipeId}:`, error);
    res.status(500).send('Error fetching recipe');
  }
});

router.get('/userrecipe/:created', async (req, res) => {
  try {
    const useremail = await Recipe.findOne({ created: req.params.created });
    console.log(useremail);
    if (!useremail) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json([useremail]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});




module.exports = router;