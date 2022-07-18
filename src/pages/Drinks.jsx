import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';

export default function Drinks() {
  const { recipe, setRecipe } = useContext(RecipesContext);
  const { drinks } = recipe;
  const history = useHistory();

  useEffect(() => {
    if (drinks && drinks.length === 1) {
      const drinkId = drinks[0].idDrink;
      history.push(`/drinks/${drinkId}`);
    }
    if (!drinks) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      setRecipe([]);
    }
  }, [drinks]);

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
      <div>
        { !!drinks && recipeFilterLimit(drinks).map((recipeF, index) => (
          <DrinkCard
            key={ recipeF.idDrink }
            recipeF={ recipeF }
            index={ index }
          />
        )) }
      </div>
      <Footer />
    </div>
  );
}
