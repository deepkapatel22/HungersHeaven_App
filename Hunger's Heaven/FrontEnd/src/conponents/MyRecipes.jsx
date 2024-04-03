import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRecipes = ({ userEmail }) => {
  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/api/recipes/byUserEmail/${userEmail}`)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes', error);
      });
  }, [userEmail]); // Fetch recipes when userEmail changes

  return (
    <div>
      <h2>User Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.recipeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;