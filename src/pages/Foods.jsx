import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import FetchFoods from '../services/FetchFoods';

export default function Foods() {
  const { recipe, fetchRecipes,
    categoryName, setCategoryName, clicked, setClicked } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (recipe && recipe.length === 1) {
      const idFood = recipe[0].idMeal;
      const sec = 500;
      setTimeout(() => { history.push(`/foods/${idFood}`); }, sec);
    }
    if (!recipe) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      FetchFoods.fetch12recipes().then((results) => fetchRecipes(results));
    }
  }, [recipe, history]);

  useEffect(() => {
    FetchFoods.fetch12recipes().then((results) => fetchRecipes(results));
  }, []);

  const fiveCategories = async () => {
    const categories = await FetchFoods.fetchByCategoriesMeals();
    setCategoryName(categories);
  };

  const buttonAll = async () => {
    FetchFoods.fetch12recipes().then((results) => fetchRecipes(results));
  };

  const getFoodsByCategories = async ({ target: { value } }) => {
    const foodsByCategories = await FetchFoods.fetchByNameCategories(value);
    fetchRecipes(foodsByCategories);
    setClicked(true);
    if (clicked) {
      setClicked(false);
      return buttonAll();
    }
  };

  useEffect(() => {
    fiveCategories();
  }, []);

  function recipeFilterLimit(arr) {
    const limit = 12;
    if (arr.length > limit) {
      return arr.slice(0, limit);
    }

    return arr;
  }

  return (
    <div>
      <div>
        <Header title="Foods" hasSearch />
      </div>
      <button
        type="button"
        onClick={ buttonAll }
        data-testid="All-category-filter"
      >
        All
      </button>
      { categoryName.map(({ strCategory }) => (
        <button
          type="button"
          value={ strCategory }
          onClick={ getFoodsByCategories }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>)) }
      <div>
        { !!recipe && recipeFilterLimit(recipe).map((recipeF, index) => (
          <Recipes
            key={ index }
            recipeF={ recipeF }
            index={ index }
          />
        )) }
      </div>
      <Footer />
    </div>
  );
}
