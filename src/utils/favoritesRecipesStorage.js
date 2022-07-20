export function favoriteRecipesRead() {
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
}

export function favoriteRecipesWrite(recipe) {
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  } else {
    const prevSave = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newSave = [...prevSave, recipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newSave));
  }
}

export function removeFavoriteRecipes(id) {
  const favsRecipes = favoriteRecipesRead();
  localStorage.setItem('favoriteRecipes', JSON
    .stringify(favsRecipes.filter((f) => f.id !== id)));
}
