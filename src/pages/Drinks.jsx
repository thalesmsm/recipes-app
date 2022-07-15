import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { RecipesContext } from '../context/RecipesContext';

export default function Drinks() {
  const { recipe } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    if (recipe.length === 1) {
      const drinkId = recipe[0].idDrink;
      history.push(`/drinks/${drinkId}`);
    }
  }, [recipe]);

  return (
    <Header title="Drinks" hasSearch />
  );
}
