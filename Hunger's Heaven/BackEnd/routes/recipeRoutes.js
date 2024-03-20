const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Adjust the path as per your structure

const mongoose = require('mongoose');


// POST: Add a new recipe
router.post('/', async (req, res) => {
  console.log('POST request to /api/recipes received');
  try {
    const recipe = new Recipe({
      recipeName : req.body.recipeName,
      persons : req.body.persons,
      ingredients : req.body.ingredients,
      method : req.body.method,
      category: req.body.category,
      spiceLevel : req.body.spiceLevel,
      type: req.body.type,
      cuisine: req.body.cuisine,
      images: req.body.images,
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


// GET: Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    console.log(recipes);
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

// router.get('/:recipeId', async (req, res) => {
//   try {
//     const recipe = await Recipe.find({ recipeId: "req.params.recipeId" });
//     console.log("Checking param id", req.params.recipeId);
//     console.log(recipe);
//     if (!recipe) {
//       return res.status(404).send('Recipe not found');
//     }
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// });

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





// Additional CRUD operations (update, delete) can be similarly defined

module.exports = router;