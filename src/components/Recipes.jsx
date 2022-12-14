import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Cards.css';

export default function Recipes({ recipeF, index }) {
  const cardRedirect = recipeF.idMeal
    ? `/foods/${recipeF.idMeal}`
    : `/drinks/${recipeF.idDrink}`;

  return (
    <Link to={ cardRedirect } className="links">
      <div
        className="card"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ recipeF.strMealThumb ?? recipeF.strDrinkThumb }
          alt={ recipeF.strMeal ?? recipeF.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <h2
          data-testid={ `${index}-card-name` }
        >
          { recipeF.strMeal ?? recipeF.strDrink }
        </h2>
        <div className="rec" />
      </div>
    </Link>
  );
}

Recipes.propTypes = {
  recipeF: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
