import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';

export default function Foods() {
  const { recipe, fetchRecipes } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (recipe && recipe.length === 1) {
      const idFood = recipe[0].idMeal;
      history.push(`/foods/${idFood}`);
    }
    if (!recipe) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      fetchRecipes([]);
    }
  }, [recipe]);

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
      <div>
        { !!recipe && recipeFilterLimit(recipe).map((recipeF, index) => (
          <FoodCard
            key={ recipeF.idMeal }
            recipeF={ recipeF }
            index={ index }
          />
        )) }
      </div>
      <Footer />
    </div>
  );
}
