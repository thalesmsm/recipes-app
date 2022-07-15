class FetchFoods {
  async fetchByIngredient(ingredient) {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json());

    return meals;
  }

  async fetchByName(name) {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((response) => response.json());

    return meals;
  }

  async fetchByFirstLetter(firstletter) {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstletter}`).then((response) => response.json());

    return meals;
  }
}

export default new FetchFoods();
