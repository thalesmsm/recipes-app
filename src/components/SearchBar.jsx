import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import FetchFoods from '../services/FetchFoods';
import FetchDrink from '../services/FetchDrinks';

export default function SearchBar() {
  const [optionInput, setOptionInput] = useState(null);
  const [searchRecipeName, setSearchRecipeName] = useState('');
  const { filter, handleChangeByFilter, fetchRecipes } = useContext(RecipesContext);
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
      fetchRecipes(recipeIngredient);
    }

    if (option === 'name') {
      const recipeName = await FetchFoods.fetchByName(searchByName);
      fetchRecipes(recipeName);
    }

    if (option === 'firstletter') {
      if (searchByName.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const recipeFirstLetter = await FetchFoods.fetchByFirstLetter(
        searchByName,
      );
      fetchRecipes(recipeFirstLetter);
    }
  }

  async function handleClickSearchDrink() {
    const { option, searchByName } = filter;

    if (option === 'ingredient') {
      const recipeIngredient = await FetchDrink.fetchByIngredient(searchByName);
      fetchRecipes(recipeIngredient);
    }

    if (option === 'name') {
      const recipeName = await FetchDrink.fetchByName(searchByName);
      fetchRecipes(recipeName);
    }

    if (option === 'firstletter') {
      if (searchByName.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const recipeFirstLetter = await FetchDrink.fetchByFirstLetter(
        searchByName,
      );
      fetchRecipes(recipeFirstLetter);
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
    <div>
      <div>
        <input
          type="text"
          data-testid="search-input"
          className="input-search scale-in-tr"
          onChange={ handleByName }
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            name="filters"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleByOptionInput }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            name="filters"
            id="name"
            value="name"
            data-testid="name-search-radio"
            onChange={ handleByOptionInput }
          />
        </label>
        <label htmlFor="firstletter">
          First Letter
          <input
            type="radio"
            name="filters"
            id="firstletter"
            value="firstletter"
            data-testid="first-letter-search-radio"
            onChange={ handleByOptionInput }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ pathname === '/foods'
            ? handleClickSearchFood : handleClickSearchDrink }
        >
          Search
        </button>
      </div>
    </div>
  );
}
