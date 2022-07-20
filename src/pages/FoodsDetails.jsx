import React, { useState, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import FetchDrinks from '../services/FetchDrinks';
import '../css/RecipeDetails.css';

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
      <div className="recomendation-container">
        { !!drink
      && drink.slice(0, six).map((r, i) => (
        <div
          data-testid={ `${i}-recomendation-card` }
          key={ i }
        >
          <img src={ r.strDrinkThumb } alt="recomendacoes" />
          <p data-testid={ `${i}-recomendation-title` }>{ r.strDrink }</p>
        </div>
      ))}
      </div>
    </div>

  );
}
