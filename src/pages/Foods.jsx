import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';

export default function Foods() {
  const { recipe, setRecipe } = useContext(RecipesContext);
  const { foods } = recipe;
  const history = useHistory();

  useEffect(() => {
    if (foods && foods.length === 1) {
      const idFood = foods[0].idMeal;
      history.push(`/foods/${idFood}`);
    }
    if (!foods) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      setRecipe([]);
    }
  }, [foods]);

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
        { !!foods && recipeFilterLimit(foods).map((recipeF, index) => (
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
