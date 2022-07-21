export const inProgressRecipesKey = () => {
  const recipesInProgress = localStorage.getItem('inProgressRecipes');

  if (recipesInProgress) {
    return JSON.parse(recipesInProgress);
  }
  return {
    cocktails: {},
    meals: {},
  };
};

export const inProgressRecipesRead = (type, id) => {
  const recipesInProgress = localStorage.getItem('inProgressRecipes');

  if (recipesInProgress) {
    return JSON.parse(recipesInProgress)[type][id];
  }
  return [];
};

export const inProgressRecipesWrite = (type, id, value) => {
  const inProgressRecipes = inProgressRecipesKey();
  inProgressRecipes[type][id] = value;

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};
