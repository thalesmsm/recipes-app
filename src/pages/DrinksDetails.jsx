import React, { useEffect, useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

export default function DrinksDetails() {
  const { recipe } = useContext(RecipesContext);

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <h1>Drinks Details</h1>
  );
}
