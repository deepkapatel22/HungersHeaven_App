import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [resFilter, setResFilter] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]); // All recipes
    
    // Value that will be supplied to all components
    const value = {
        name,
        setName,
        resFilter,
        setResFilter,
        allRecipes, 
        setAllRecipes
        
    };

    return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};
