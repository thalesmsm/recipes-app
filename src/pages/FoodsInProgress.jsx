import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchFoods from '../services/FetchFoods';
import RecipeInProgress from '../components/RecipeInProgress';

export default function FoodsInProgress() {
  const [foodsInProgress, setFoodsInProgress] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getFoodsDetails = async () => {
      const foods = await FetchFoods.fetchFoodDetails(id);
      setFoodsInProgress(foods[0]);
    };
    getFoodsDetails();
  }, []);

  return (
    <div>
      {/* <h1>Foods in Progress</h1> */}
      <RecipeInProgress recipeProgress={ foodsInProgress } />
    </div>
  );
}
