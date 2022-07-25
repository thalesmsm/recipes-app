import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchDrinks from '../services/FetchDrinks';
import RecipeInProgress from '../components/RecipeInProgress';

export default function DrinksInProgress() {
  const [drinkInProgress, setDrinkInProgress] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDrinkDetails = async () => {
      const drink = await FetchDrinks.fetchDrinksDetails(id);
      setDrinkInProgress(drink[0]);
    };
    getDrinkDetails();
  }, []);

  return (
    <div>
      {/* <h1>Drinks in Progress</h1> */}
      <RecipeInProgress recipeProgress={ drinkInProgress } />
    </div>
  );
}
