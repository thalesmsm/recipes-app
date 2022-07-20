export function doneRecipesRead() {
  if (!localStorage.getItem('doneRecipes')) {
    return [{
      id: 0,
      type: '',
      nationality: '',
      category: '',
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: '',
      tags: '',
    }];
  }

  return JSON.parse(localStorage.getItem('doneRecipes'));
}

export function doneRecipesWrite(recipe) {
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
  } else {
    const prevSave = JSON.parse(localStorage.getItem('doneRecipes'));
    const newSave = [...prevSave, recipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newSave));
  }
}
