class FetchDrinks {
  async fetchByIngredient(ingredient) {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json());

    return drinks;
  }

  async fetchByName(name) {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response.json());

    return drinks;
  }

  async fetchByFirstLetter(firstletter) {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstletter}`).then((response) => response.json());

    return drinks;
  }
}

export default new FetchDrinks();
