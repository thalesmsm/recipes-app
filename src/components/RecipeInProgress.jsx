import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { favoriteRecipesWrite,
  favoriteRecipesRead, removeFavoriteRecipes } from '../utils/favoritesRecipesStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import '../css/RecipesInProgress.css';

export default function RecipeInProgress({ recipeProgress }) {
  const [favorite, setFavorite] = useState(false);
  const [share, setShare] = useState(false);
  // const [checked, setChecked] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const pathnameFoods = history.location.pathname.includes('/foods');

  const shareButton = () => {
    if (pathnameFoods) {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    setShare(true);
  };

  const setLocalStorageFavs = () => {
    if (favorite) {
      removeFavoriteRecipes(id);
    } else {
      const recipesFavs = {
        id: recipeProgress.idMeal ?? recipeProgress.idDrink,
        type: pathnameFoods ? 'food' : 'drink',
        nationality: recipeProgress.strArea ?? '',
        category: recipeProgress.strCategory ?? '',
        alcoholicOrNot: recipeProgress.strAlcoholic ?? '',
        name: recipeProgress.strMeal ?? recipeProgress.strDrink,
        image: recipeProgress.strMealThumb ?? recipeProgress.strDrinkThumb,
      };

      favoriteRecipesWrite(recipesFavs);
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    const favsInStorage = favoriteRecipesRead();
    const checkHasFavs = favsInStorage
      .some((favs) => favs.id === id);
    if (checkHasFavs) {
      setFavorite(true);
    }
  }, [id]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeProgress.strMealThumb ?? recipeProgress.strDrinkThumb }
        alt="receita"
      />
      <button
        type="button"
        data-testid="share-btn"
        onClick={ shareButton }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <button
        type="button"
        onClick={ setLocalStorageFavs }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          data-testid="favorite-btn"
        />
      </button>
      {share && <p>Link copied!</p> }
      <h1
        data-testid="recipe-title"
      >
        { recipeProgress.strDrink ?? recipeProgress.strMeal }
      </h1>
      <p data-testid="recipe-category">
        { recipeProgress.strCategory }
        { recipeProgress.strAlcoholic }
      </p>
      <p
        data-testid="instructions"
      >
        { recipeProgress.strInstructions ?? recipeProgress.strInstructions }

      </p>
      { Object.keys(recipeProgress)
        .filter((i) => i.includes('strIngredient')).map((ing, index) => {
          if (recipeProgress[ing] && recipeProgress[ing].length > 1) {
            return (
              <label
                key={ index }
                htmlFor={ recipeProgress.strMeal ?? recipeProgress.strDrink }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  onChange={ ({ target }) => !target.checked }
                  type="checkbox"
                  id={ recipeProgress.strMeal ?? recipeProgress.strDrink }
                  // className="ingredient-done"
                />
                { recipeProgress[ing]
                    && `${recipeProgress[ing]} : 
                    ${recipeProgress[`strMeasure${index + 1}`]}` }
              </label>
            );
          }
          return null;
        }) }
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Finish recipe

      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipeProgress: PropTypes.shape().isRequired,
};
