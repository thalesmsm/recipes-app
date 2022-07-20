import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/RecipeDetails.css';

export default function ButtonProgessRecipe() {
  const [isDone, setIsDone] = useState(false);
  const { userId } = useParams();

  const statusBtnRecipe = () => {
    const localDoneRecipes = doneRecipesRead();
    // const id = pathname.split('/').at(magic);
    const finishRecipes = localDoneRecipes
      .some((recipe) => recipe.id === userId);

    if (finishRecipes) {
      setIsDone(true);
    }
  };

  useEffect(() => {
    statusBtnRecipe();
  }, []);

  return (
    <div>
      { !isDone
                  && (
                    <button
                      type="button"
                      data-testid="start-recipe-btn"
                      className="start-recipe-btn"
                    >
                      Start Recipe
                    </button>) }
    </div>
  );
}
