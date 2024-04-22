const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Adjust the path as per your structure
const User = require('../models/User');
const mongoose = require('mongoose');
const Like = require('../models/Like'); 
const Comment = require('../models/Comment');
const axios = require('axios');
const OpenAIApi = require('openai');
const dotenv = require("dotenv");
const Configuration = require('openai')
const openai = require('openai');
dotenv.config();

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
    const useremail = await Recipe.find({ created: req.params.created });
    console.log(useremail);
    if (!useremail) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(useremail);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/delete/:created', async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ created: req.params.created });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
});

router.put('/update/:recipeId', async (req, res) => {
  
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate({ recipeId: req.params.recipeId }, req.body, { new: true });
    // const updatedRecipe = await Recipe.findOneAndUpdate({ created: req.params.created });
    if (!updatedRecipe) {
      return res.status(404).send('Recipe not found');
    }
    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Error updating recipe' });
  }
});
router.post('/:recipeId/likes', async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.body.userId; // Assuming you have user information in req.user from your authentication middleware

  try {
    // Check if the like already exists
    const existingLike = await Like.findOne({ recipeId, userId });

    if (existingLike) {
      // If like exists, remove it
      await Like.deleteOne({ userId: existingLike.userId });
      res.status(200).json({ message: 'Like removed' });
    } else {
      // If like does not exist, add it
      const newLike = new Like({ recipeId, userId });
      await newLike.save();
      res.status(200).json({ message: 'Like added' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ message: 'Error toggling like', error: error.message });
  }
});

router.post('/:recipeId/comments', async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { text, userEmail } = req.body; // Include more fields as needed

    const newComment = new Comment({ recipeId, text, userEmail });
    await newComment.save();

    res.status(201).send(newComment);
  } catch (error) {
    res.status(500).send({ message: 'Failed to post comment', error: error.message });
  }
});
router.get('/:recipeId/likes', async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userEmail = req.query.userEmail; // Assuming you pass userEmail as a query parameter
    
    const likesCount = await Like.countDocuments({ recipeId });
    const userLike = await Like.findOne({ recipeId, userEmail });

    res.json({ likesCount, likedByUser: !!userLike });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Error fetching likes', error: error.message });
  }
});


router.get('/:recipeId/comments', async (req, res) => {
  try {
    const { recipeId } = req.params;

    const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch comments', error: error.message });
  }
});

router.post('/comments/:commentId/replies', async (req, res) => {
  const { commentId } = req.params;
  const { text, userId } = req.body; // Include authentication to get userId

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }

    // Add the reply to the comment's replies array
    comment.replies.push({ text, userId });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).send({ message: 'Failed to add reply', error: error.message });
  }
});

// In your Node.js routes file

router.post('/search', async (req, res) => {
  const { query } = req.body;

  try {
    // Perform a regex search across multiple fields
    const recipes = await Recipe.find({
      $or: [
        { recipeName: { $regex: query, $options: 'i' } },
        { cuisine: { $regex: query, $options: 'i' } },
        { category : { $regex: query, $options: 'i' } }, 
        { spiceLevel : { $regex: query, $options: 'i' } },
        { type : { $regex: query, $options: 'i' } },
        { 'ingredients.name': { $regex: query, $options: 'i' } }
      ]
  });

    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching recipes.");
  }
});
router.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",  
          messages: [{ role: "user", content: message }]
      }, {
          headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
          }
      });
      const chatResponse = response.data.choices[0].message.content;
      res.json({ message: chatResponse });
      // res.json(response.data.choices[0].message.content);
      // console.log(response.data.choices[0].message.content);
  } catch (error) {
      console.error('Error calling OpenAI API:', error.response.data);
      res.status(500).send('Failed to fetch response from OpenAI');
  }
});




module.exports = router;