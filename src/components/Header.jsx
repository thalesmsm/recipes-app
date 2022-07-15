import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import FetchFoods from '../services/FetchFoods';
import { RecipesContext } from '../context/RecipesContext';
import '../css/Header.css';

export default function Header({ title, hasSearch }) {
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [optionInput, setOptionInput] = useState(null);
  const [searchRecipeName, setSearchRecipeName] = useState('');
  const { filter, handleChangeByFilter, fetchRecipes } = useContext(RecipesContext);

  function handleByName({ target }) {
    const { value } = target;

    setSearchRecipeName(value);
  }

  function handleByOptionInput({ target }) {
    const { value } = target;

    setOptionInput(value);
  }

  async function handleClickSearch() {
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

  useEffect(() => {
    handleChangeByFilter((pState) => ({
      ...pState,
      option: optionInput,
      searchByName: searchRecipeName,
    }));
  }, [optionInput, searchRecipeName]);

  return (
    <header className="header-container">
      <div className="header">
        <Link to="/profile">
          <button type="button" className="header-btn">
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {hasSearch ? (
          <button
            type="button"
            onClick={ () => setVisibleSearch(!visibleSearch) }
            className="header-btn"
          >
            <img
              src={ searchIcon }
              alt="profile-icon"
              data-testid="search-top-btn"
            />
          </button>
        ) : (
          <button type="button" className="transparent-btn">
            -
          </button>
        )}
      </div>
      {visibleSearch && (
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
              onClick={ handleClickSearch }
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool,
};

Header.defaultProps = {
  hasSearch: false,
};
