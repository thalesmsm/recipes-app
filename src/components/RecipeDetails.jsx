import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import FetchDrinks from '../services/FetchDrinks';
import FetchFoods from '../services/FetchFoods';
import { doneRecipesRead } from '../utils/doneRecipesStorage';
import { favoriteRecipesWrite,
  favoriteRecipesRead, removeFavoriteRecipes } from '../utils/favoritesRecipesStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeDetails() {
  const [recipeInfos, setRecipeInfos] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [share, setShare] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const pathnameFoods = history.location.pathname.includes('/foods');

  useEffect(() => {
    if (pathname === `/drinks/${id}`) {
      const getDrinksDetails = async () => {
        const drinks = await FetchDrinks.fetchDrinksDetails(id);
        setRecipeInfos(drinks[0]);
      };
      getDrinksDetails();
    } else {
      const getFoodsDetails = async () => {
        const foods = await FetchFoods.fetchFoodDetails(id);
        setRecipeInfos(foods[0]);
      };
      getFoodsDetails();
    }
  }, []);

  useEffect(() => {
    const localDoneRecipes = doneRecipesRead();
    // const id = pathname.split('/').at(magic);
    const finishRecipes = localDoneRecipes
      .some((recipe) => recipe.id === id);

    if (finishRecipes) {
      setIsDone(true);
    }
  }, [id]);

  const handleClickStart = async () => {
    if (pathnameFoods) {
      history.push(`/foods/${id}/in-progress`);
    } else {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

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
        id: recipeInfos.idMeal ?? recipeInfos.idDrink,
        type: pathnameFoods ? 'food' : 'drink',
        nationality: recipeInfos.strArea ?? '',
        category: recipeInfos.strCategory ?? '',
        alcoholicOrNot: recipeInfos.strAlcoholic ?? '',
        name: recipeInfos.strMeal ?? recipeInfos.strDrink,
        image: recipeInfos.strMealThumb ?? recipeInfos.strDrinkThumb,
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
      { !!recipeInfos

        && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipeInfos.strMealThumb ?? recipeInfos.strDrinkThumb }
              alt={ recipeInfos.strMealThumb ?? recipeInfos.strDrinkThumb }
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
              { recipeInfos.strDrink ?? recipeInfos.strMeal }
            </h1>
            <p data-testid="recipe-category">
              { recipeInfos.strCategory }
              { recipeInfos.strAlcoholic }
            </p>
            <p
              data-testid="instructions"
            >
              { recipeInfos.strInstructions ?? recipeInfos.strInstructions }

            </p>
            { Object.keys(recipeInfos)
              .filter((i) => i.includes('strIngredient')).map((ing, index) => (
                <div key={ index }>
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { recipeInfos[ing]
                    && `${recipeInfos[ing]} : ${recipeInfos[`strMeasure${index + 1}`]}` }
                  </p>
                </div>
              )) }
            { recipeInfos.strYoutube
            && <iframe
              title="video"
              width="300"
              src={ recipeInfos.strYoutube.replace('watch?v=', 'embed/') }
              data-testid="video"
            />}
          </div>
        )}
      <div>
        { !isDone
                  && (
                    <button
                      type="button"
                      data-testid="start-recipe-btn"
                      className="start-recipe-btn"
                      onClick={ handleClickStart }
                    >
                      Start Recipe
                    </button>) }
      </div>
    </div>
  );
}
