import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Header2 from './Header2';
import AddRecipeForm from './WriteFoods';

const Recipe2 = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesByid, setRecipesByid] = useState(false);
  
  const emailId = localStorage.getItem("email");
  useEffect(() => {
    // Fetch recipes when component mounts
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/userrecipe/${emailId}`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array means this effect runs once on mount
  const getRecipeById = async (recipeId) => {
    console.log(recipeId);
    try {
      console.log(recipeId);
      const userrecipe =  await axios.get(`http://localhost:3000/api/recipes/${recipeId}`);
      // Update the state to remove the deleted recipe
      setRecipesByid(userrecipe.data);
      console.log(userrecipe.data);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      console.log(recipeId);
      await axios.delete(`http://localhost:3000/api/recipes/delete/${emailId}`);
      // Update the state to remove the deleted recipe
      setRecipes(currentRecipes => currentRecipes.filter(recipe => recipe.recipeId !== recipeId));
      alert("Recipe deleted successfully");
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  return (
    <>
    <Header2/>
    <RecipeCard>
      <RecipeHeading>Recipes</RecipeHeading>
      <div className="recipes-container">
          {/* Check if recipes array is empty and display message if true */}
          {recipes.length === 0 ? (
            <p>This user has no recipe uploaded.</p>
          ) : (
            recipes.map((recipe) => (
              <div key={recipe.recipeId} className="recipe-card">
                <img src={recipe.images} alt={recipe.recipeName} />
                <Link to={`/showrecipe/${recipe.recipeId}`} className="recipe-button">
                  <h3>{recipe.recipeName}</h3>
                </Link>
                <p>{recipe.cuisine}</p>
                <div className='editdelete'>
                  <EditButton onClick={() => getRecipeById(recipe.recipeId)}>Edit</EditButton>
                  <DeleteButton onClick={() => deleteRecipe(recipe.recipeId)}>Delete</DeleteButton>
                </div>
              </div>
            ))
          )}
        </div>
    </RecipeCard>
    {recipesByid && 
    <AddRecipeForm  editData={recipesByid}/>
    }
    </>
  );
};

export default Recipe2;

const EditButton = styled.button`
  background-color: #007bff; /* Bootstrap blue */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px; /* Space between Edit and Delete buttons */
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545; /* Bootstrap red */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;
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
.editdelete{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
`;

const RecipeHeading = styled.h1`
text-align: center;
margin-top: 100px;
`;