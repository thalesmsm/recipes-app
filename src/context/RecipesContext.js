import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

export default function RecipesProvider({ children }) {
  const [filter, setFilter] = useState({
    option: '',
    searchByName: '',
  });

  const [recipe, setRecipe] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [clicked, setClicked] = useState(false);

  const initialContext = {
    filter,
    recipe,
    handleChangeByFilter: (filtered) => setFilter(filtered),
    fetchRecipes: (results) => setRecipe(results),
    categoryName,
    setCategoryName,
    clicked,
    setClicked,
  };

  return (
    <RecipesContext.Provider value={ initialContext }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
