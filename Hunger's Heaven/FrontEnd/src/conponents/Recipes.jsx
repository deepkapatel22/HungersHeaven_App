import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRecipes } from '../contexts/RecipeContext';

const Recipes = () => {
  const { resFilter, name } = useRecipes(); // Using context to get filtered recipes and the search term
  const [allRecipes, setAllRecipes] = useState([]); // State to hold all recipes

  // useEffect(() => {
  //     axios.get('http://localhost:3000/api/recipes')
  //         .then(response => {
  //             setAllRecipes(response.data);
  //         })
  //         .catch(error => console.error('Error fetching all recipes:', error));
  // }, []);
  useEffect(() => {
    axios.get('http://localhost:3000/api/recipes')
        .then(response => {
            const sortedRecipes = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            setAllRecipes(sortedRecipes.slice(0, 4)); // Only take the first four
        })
        .catch(error => console.error('Error fetching all recipes:', error));
}, []);

  // Determine what to display based on the search results and whether a search was made
  let content;
  if (resFilter.length > 0 || name) {
      content = resFilter.length > 0 ? resFilter.map((recipe) => (
          <div key={recipe.recipeId} className="recipe-card">
              <img src={recipe.images} alt={recipe.recipeName} />
              <Link to={`/showrecipe/${recipe.recipeId}`} className="recipe-button">
                  <h3>{recipe.recipeName}</h3>
              </Link>
              <p>{recipe.cuisine}</p>
          </div>
      )) : <p>No recipes found.</p>; // Show this message if search yielded no results
  } else {
      // If no search has been made, display all recipes
      content = allRecipes.map((recipe) => (
          <div key={recipe.recipeId} className="recipe-card">
              <img src={recipe.images} alt={recipe.recipeName} />
              <Link to={`/showrecipe/${recipe.recipeId}`} className="recipe-button">
                  <h3>{recipe.recipeName}</h3>
              </Link>
              <p>{recipe.cuisine}</p>
          </div>
      ));
  }
  return (
    <RecipeCard>
      <RecipeHeading>Recipes</RecipeHeading>
            <div className="recipes-container">
                {content}
            </div>
            <Link to="/all-recipes" className="view-more">View More</Link>      
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
.view-more {
  display: block;
  text-align: center;
  margin-top: 20px;
  background-color: #000;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
}
`;

const RecipeHeading = styled.h1`
text-align: center;
`;