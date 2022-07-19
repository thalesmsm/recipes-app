import React, { useState, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import FetchDrinks from '../services/FetchDrinks';

export default function FoodsDetails() {
  const [drink, setDrink] = useState([]);
  const six = 6;

  const getDrink = async () => {
    const drinks = await FetchDrinks.fetch12recipes();
    setDrink(drinks);
  };

  useEffect(() => {
    getDrink();
  }, []);

  return (
    <div>
      <RecipeDetails />
      { !!drink
      && drink.slice(0, six).map((r, i) => (
        <div
          data-testid={ `${i}-recomendation-card` }
          key={ i }
        >
          <img src={ r.strDrinkThumb } alt="recomendacoes" />
          <p>{ r.strDrink }</p>
        </div>
      ))}
    </div>

  );
}
