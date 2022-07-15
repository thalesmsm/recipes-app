import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';

export default function Foods() {
  const { recipe } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (recipe.length === 1) {
      const idFood = recipe[0].idMeal;
      history.push(`/foods/${idFood}`);
    }
  }, [recipe]);

  return (
    <div>
      <Header title="Foods" hasSearch />
    </div>
  );
}
