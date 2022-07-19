import React, { useState, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import FetchFoods from '../services/FetchFoods';

export default function DrinksDetails() {
  const [food, setFood] = useState([]);
  const six = 6;

  const getFood = async () => {
    const foods = await FetchFoods.fetch12recipes();
    setFood(foods);
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div>
      <RecipeDetails />
      { !!food
      && food.slice(0, six).map((r, i) => (
        <div
          data-testid={ `${i}-recomendation-card` }
          key={ i }
        >
          <img src={ r.strMealThumb } alt="recomendacoes" />
          <p>{ r.strMeal }</p>
        </div>
      ))}
    </div>

  );
}
