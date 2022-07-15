import React from 'react';
import PropTypes from 'prop-types';

export default function FoodCard({ recipeF, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ recipeF.strMealThumb }
        alt={ recipeF.strMeal }
        data-testid={ `${index}-card-img` }
      />
      <h2
        data-testid={ `${index}-card-name` }
      >
        { recipeF.strMeal }
      </h2>
    </div>
  );
}

FoodCard.propTypes = {
  recipeF: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
