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

  async fetch12recipes() {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then((response) => response.json());

    return meals;
  }

  async fetchByCategoriesMeals() {
    const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((response) => response.json());

    const limit = 5;
    return meals.slice(0, limit);
  }

  async fetchByNameCategories(foodsCategories) {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodsCategories}`).then((response) => response.json());

    const limit = 12;
    return meals.slice(0, limit);
  }

  async fetchFoodDetails(recipeId) {
    const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`).then((response) => response.json());

    return meals;
  }
}

export default new FetchFoods();
