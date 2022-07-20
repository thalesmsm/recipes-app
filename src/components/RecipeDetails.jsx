import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FetchDrinks from '../services/FetchDrinks';
import FetchFoods from '../services/FetchFoods';

export default function RecipeDetails() {
  const [recipeInfos, setRecipeInfos] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const magic = -1;
    const id = pathname.split('/').at(magic);
    if (pathname === `/drinks/${id}`) {
      const getDrinksDetails = async () => {
        const one = -1;
        const drinks = await FetchDrinks.fetchDrinksDetails(pathname.split('/').at(one));
        setRecipeInfos(drinks[0]);
      };
      getDrinksDetails();
    } else {
      const getFoodsDetails = async () => {
        const one = -1;
        const foods = await FetchFoods.fetchFoodDetails(pathname.split('/').at(one));
        setRecipeInfos(foods[0]);
      };
      getFoodsDetails();
    }
  }, []);

  // function youtubeLink(link) {
  //   if (!link) return;
  //   const baseEmbedURL = 'https://www.youtube.com/embed/';
  //   const videoId = link.split('v=')[1];
  //   return `${baseEmbedURL}${videoId}`;
  // }

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
    </div>
  );
}
