import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import FetchDrinks from '../services/FetchDrinks';

export default function Drinks() {
  const { recipe, fetchRecipes,
    categoryName, setCategoryName, clicked, setClicked } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (recipe && recipe.length === 1) {
      const drinkId = recipe[0].idDrink;
      const sec = 500;
      setTimeout(() => {
        history.push(`/drinks/${drinkId}`);
      }, sec);
    }
    if (!recipe) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      FetchDrinks.fetch12recipes().then((results) => fetchRecipes(results));
    }
  }, [recipe, history]);

  useEffect(() => {
    FetchDrinks.fetch12recipes().then((results) => fetchRecipes(results));
  }, []);

  const fiveCategories = async () => {
    const categories = await FetchDrinks.fetchByCategoriesDrinks();
    setCategoryName(categories);
  };

  const buttonAll = async () => {
    FetchDrinks.fetch12recipes().then((results) => fetchRecipes(results));
  };

  const getDrinksByCategories = async ({ target: { value } }) => {
    const drinksByCategories = await FetchDrinks.fetchByNameCategories(value);
    fetchRecipes(drinksByCategories);
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
        <Header title="Drinks" hasSearch />
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
          onClick={ getDrinksByCategories }
          value={ strCategory }
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
