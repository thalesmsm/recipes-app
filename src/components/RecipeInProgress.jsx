import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { favoriteRecipesWrite,
  favoriteRecipesRead, removeFavoriteRecipes } from '../utils/favoritesRecipesStorage';
import { inProgressRecipesRead,
  inProgressRecipesWrite } from '../utils/inProgressRecipes';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../css/RecipesInProgress.css';
import { doneRecipesWrite } from '../utils/doneRecipesStorage';

export default function RecipeInProgress({ recipeProgress }) {
  const [favorite, setFavorite] = useState(false);
  const [share, setShare] = useState(false);
  const [isChecked, setIsChecked] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
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

    const checkedStorage = () => {
      if (pathnameFoods) {
        const response = inProgressRecipesRead('meals', id) ?? [];
        response.forEach((r) => setIsChecked((pState) => ({ ...pState, [r]: true })));
      } else {
        const response = inProgressRecipesRead('cocktails', id) ?? [];
        response.forEach((r) => setIsChecked((pState) => ({ ...pState, [r]: true })));
      }
    };

    checkedStorage();

    return () => {
      setIsChecked({});
    };
  }, [id]);

  const ingredients = Object.keys(recipeProgress)
    .filter((i) => i.includes('strIngredient'))
    .filter((ing) => recipeProgress[ing] && recipeProgress[ing].length > 1);

  const handleCheckBox = ({ target: { name, checked } }) => {
    const newChecked = { ...isChecked, [name]: checked };
    const checkedValues = Object.values(newChecked);
    if (pathnameFoods) {
      inProgressRecipesWrite('meals', id, Object.entries(newChecked)
        .filter((checkRecipe) => checkRecipe[1] === true)
        .map(([kRecipe]) => kRecipe));
      setIsChecked(newChecked);
      setIsDisabled(checkedValues.every((e) => e === true)
      && (checkedValues.length === ingredients.length));
    } else {
      inProgressRecipesWrite('cocktails', id, Object
        .entries(newChecked)
        .filter((checkRecipe) => checkRecipe[1] === true)
        .map(([kRecipe]) => kRecipe));
      setIsChecked(newChecked);
      setIsDisabled(checkedValues.every((e) => e === true)
      && (checkedValues.length === ingredients.length));
    }
  };

  const handleButtonFinish = () => {
    const storageDone = {
      id: recipeProgress.idMeal ?? recipeProgress.idDrink,
      type: pathnameFoods ? 'food' : 'drink',
      nationality: recipeProgress.strArea ?? '',
      category: recipeProgress.strCategory ?? '',
      alcoholicOrNot: recipeProgress.strAlcoholic ?? '',
      name: recipeProgress.strMeal ?? recipeProgress.strDrink,
      image: recipeProgress.strMealThumb ?? recipeProgress.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags:
        recipeProgress.strTags && recipeProgress.strTags.length > 0
          ? recipeProgress.strTags.split(',')
          : [],
    };
    doneRecipesWrite(storageDone);
    history.push('/done-recipes');
  };

  return (
    <div>
      <div className="inprogress-container">
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
          .filter((i) => i.includes('strIngredient')).map((ing, i) => {
            if (recipeProgress[ing] && recipeProgress[ing].length > 1) {
              return (
                <label
                  key={ i }
                  htmlFor={ i + ing }
                  data-testid={ `${i}-ingredient-step` }
                  className={ isChecked[i + ing] ? 'ingredient-done' : undefined }
                >
                  <input
                    type="checkbox"
                    id={ i + ing }
                    name={ i + ing }
                    checked={ isChecked[i + ing] ?? false }
                    onChange={ handleCheckBox }
                  />
                  { recipeProgress[ing]
                      && `${recipeProgress[ing]} :
                      ${recipeProgress[`strMeasure${i + 1}`]}` }
                </label>
              );
            }
            return null;
          })}
      </div>
      <div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ handleButtonFinish }
          className="finish-recipe-btn"
          disabled={ !isDisabled }
        >
          Finish recipe
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipeProgress: PropTypes.objectOf(PropTypes.string).isRequired,
};
