import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

export default function RecipesProvider({ children }) {
  const [filter, setFilter] = useState({
    option: '',
    searchByName: '',
  });

  const [recipe, setRecipe] = useState({
    foods: [],
    drinks: [],
  });

  const initialContext = {
    filter,
    recipe,
    handleChangeByFilter: (filtered) => setFilter(filtered),
    setRecipe,
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
