import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ShowRecipeCSS = styled.div`

  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  background: #fff;
  margin-top: 70px;
`;

// Styles for the ingredient list
const IngredientList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

// Styles for each ingredient item
const IngredientItem = styled.li`
  margin-bottom: 5px;  
`;

// Styles for images
const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 20px;
  border-radius: 8px;
`;

// Apply additional global styles as needed
// For example, for headings to have a consistent appearance:
const Heading = styled.h1`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeading = styled.h3`
  color: #666;
  margin-top: 20px;
  border-bottom: 1px solid #eee;
`;
export const Paragraph = styled.p`
  font-size: 16px; 
  color: #333; 
  line-height: 1.5; 
  margin-bottom: 15px; 
`;

const ShowRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.log(recipe)
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <ShowRecipeCSS>
      <Heading>{recipe.recipeName}</Heading>
      <SubHeading>Servings </SubHeading>
      <Paragraph>{recipe.persons}</Paragraph>
      <SubHeading>Ingredients</SubHeading>
      <IngredientList>
        {recipe.ingredients.map((ingredient, index) => (
          <IngredientItem key={index}>
            {ingredient.name} - {ingredient.amount}
          </IngredientItem>
        ))}
      </IngredientList>
      <SubHeading>Method</SubHeading>
      <Paragraph>{recipe.method}</Paragraph>
      <SubHeading>Category </SubHeading>
      <Paragraph>{recipe.category}</Paragraph>
      <SubHeading>Spice Level </SubHeading>
      <Paragraph>{recipe.spiceLevel}</Paragraph>
      <SubHeading>Type </SubHeading>
      <Paragraph>{recipe.type}</Paragraph>
      <SubHeading>Cuisine </SubHeading>
      <Paragraph>{recipe.cuisine}</Paragraph>
        <div>
          <SubHeading>Images</SubHeading>
          {/*{recipe.images && recipe.images.map((image, index) => (}*/}
            <Image src={recipe.images} alt={`Recipe Image`} />
        {/* ))}*/}
        </div>
    </ShowRecipeCSS>
  );
};

export default ShowRecipe;
