import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import FetchFoods from '../services/FetchFoods';
import FetchDrink from '../services/FetchDrinks';
import '../css/SearchBar.css';

export default function SearchBar() {
  const [optionInput, setOptionInput] = useState(null);
  const [searchRecipeName, setSearchRecipeName] = useState('');
  const { filter, handleChangeByFilter, setRecipe } = useContext(RecipesContext);
  const { pathname } = useLocation();

  function handleByName({ target }) {
    const { value } = target;

    setSearchRecipeName(value);
  }

  function handleByOptionInput({ target }) {
    const { value } = target;

    setOptionInput(value);
  }

  async function handleClickSearchFood() {
    const { option, searchByName } = filter;

    if (option === 'ingredient') {
      const recipeIngredient = await FetchFoods.fetchByIngredient(searchByName);
      setRecipe((pState) => ({ ...pState, foods: recipeIngredient }));
    }

    if (option === 'name') {
      const recipeName = await FetchFoods.fetchByName(searchByName);
      setRecipe((pState) => ({ ...pState, foods: recipeName }));
    }

    if (option === 'firstletter') {
      if (searchByName.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const recipeFirstLetter = await FetchFoods.fetchByFirstLetter(
        searchByName,
      );
      setRecipe((pState) => ({ ...pState, foods: recipeFirstLetter }));
    }
  }

  async function handleClickSearchDrink() {
    const { option, searchByName } = filter;

    if (option === 'ingredient') {
      const recipeIngredient = await FetchDrink.fetchByIngredient(searchByName);
      // fetchRecipes(recipeIngredient);
      setRecipe((pState) => ({ ...pState, drinks: recipeIngredient }));
    }

    if (option === 'name') {
      const recipeName = await FetchDrink.fetchByName(searchByName);
      // fetchRecipes(recipeName);
      setRecipe((pState) => ({ ...pState, drinks: recipeName }));
    }

    if (option === 'firstletter') {
      if (searchByName.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const recipeFirstLetter = await FetchDrink.fetchByFirstLetter(
        searchByName,
      );
      // fetchRecipes(recipeFirstLetter);
      setRecipe((pState) => ({ ...pState, drinks: recipeFirstLetter }));
    }
  }

  useEffect(() => {
    handleChangeByFilter((pState) => ({
      ...pState,
      option: optionInput,
      searchByName: searchRecipeName,
    }));
  }, [optionInput, searchRecipeName]);

  return (
    <div className="search-bar-container">
      <div>
        <input
          type="text"
          data-testid="search-input"
          className="input-search"
          onChange={ handleByName }
        />
      </div>
      <div className="radios-container">
        <label htmlFor="ingredient" className="label-container">
          Ingredient
          <input
            type="radio"
            name="filters"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            className="input-radio"
            onChange={ handleByOptionInput }
          />
        </label>
        <label htmlFor="name" className="label-container">
          Name
          <input
            type="radio"
            name="filters"
            id="name"
            value="name"
            data-testid="name-search-radio"
            className="input-radio"
            onChange={ handleByOptionInput }
          />
        </label>
        <label htmlFor="firstletter" className="label-container">
          First Letter
          <input
            type="radio"
            name="filters"
            id="firstletter"
            value="firstletter"
            data-testid="first-letter-search-radio"
            className="input-radio"
            onChange={ handleByOptionInput }
          />
          <span className="checkmark" />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="search-btn"
        onClick={ pathname === '/foods'
          ? handleClickSearchFood : handleClickSearchDrink }
      >
        Search
      </button>
    </div>
  );
}
