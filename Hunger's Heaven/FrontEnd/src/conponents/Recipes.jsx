import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    // Fetch recipes when component mounts
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <RecipeCard>
      <RecipeHeading>Recipes</RecipeHeading>
      <div className="recipes-container">
      {recipes.map((recipe) => (
        <div key={recipe.recipeId} className="recipe-card">
          <img src={recipe.images} alt={recipe.recipeName} />
          <Link to={`/showrecipe/${recipe.recipeId}`} className="recipe-button">
            <h3>{recipe.recipeName}</h3>
          </Link>
          <p>{recipe.cuisine}</p>
          {/* Additional recipe details can be added here */}
        </div>
      ))}
      
      </div>
    </RecipeCard>
  );
};

export default Recipes;

const RecipeCard = styled.div`
.recipes-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px; /* Adjust the gap between cards */
  align-items: center;
}

.recipe-card {
  flex: 1;
  min-width: 250px; /* Minimum width of each card */
  max-width: 300px; /* Maximum width of each card */
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-card img {
  width: 100%;
  border-radius: 4px;
}

.recipe-card h3 {
  margin: 10px 0;
}

.recipe-card p {
  color: #666;
  text-align: center;
}
.recipe-button {
  display: inline-block; 
  background-color: black; 
  color: white; 
  padding: 10px 20px;
  text-align: center; 
  text-decoration: none; 
  border-radius: 5px; 
  transition: background-color 0.3s; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  display: flex;
  justify-content: center;
  align-items: center;
}

.recipe-button h3 {
  margin: 0; 
  color: inherit; 
  font-size: 1em; 
}

.recipe-button:hover, .recipe-button:focus {
  background-color: #0056b3; 
  color: white; 
  text-decoration: none; 
}
#arrow{
  font-size:50px;
}
`;

const RecipeHeading = styled.h1`
text-align: center;
`;