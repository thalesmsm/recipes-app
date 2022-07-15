import React from 'react';
import PropTypes from 'prop-types';
import '../css/Cards.css';

export default function FoodCard({ recipeF, index }) {
  return (
    <div
      className="card"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipeF.strDrinkThumb }
        alt={ recipeF.strDrink }
        data-testid={ `${index}-card-img` }
      />
      <h2
        data-testid={ `${index}-card-name` }
      >
        { recipeF.strDrink }
      </h2>
    </div>
  );
}

FoodCard.propTypes = {
  recipeF: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
