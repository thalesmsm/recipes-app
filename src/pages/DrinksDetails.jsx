import React, { useState, useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import FetchFoods from '../services/FetchFoods';
import '../css/RecipeDetails.css';

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
      <div className="recomendation-container">
        { !!food
      && food.slice(0, six).map((r, i) => (
        <div
          data-testid={ `${i}-recomendation-card` }
          key={ i }
        >
          <img src={ r.strMealThumb } alt="recomendacoes" />
          <p data-testid={ `${i}-recomendation-title` }>{ r.strMeal }</p>
        </div>
      ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>

  );
}
