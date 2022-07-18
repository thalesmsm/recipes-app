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

  async fetch12recipes() {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response) => response.json());

    return drinks;
  }

  async fetchByCategoriesDrinks() {
    const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((response) => response.json());

    const limit = 5;
    return drinks.slice(0, limit);
  }

  async fetchByNameCategories(drinkCategories) {
    const { drinks } = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinkCategories}`).then((response) => response.json());

    const limit = 12;
    return drinks.slice(0, limit);
  }
}

export default new FetchDrinks();
