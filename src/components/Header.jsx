import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../css/Header.css';

export default function Header({ title, hasSearch }) {
  const [visibleSearch, setVisibleSearch] = useState(false);

  return (
    <header className="header-container">
      <div className="header">
        <Link to="/profile">
          <button
            type="button"
            className="header-btn"
          >
            <img
              src={ profileIcon }
              alt="profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { hasSearch
          ? (
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
          )
          : <button type="button" className="transparent-btn">-</button>}
      </div>
      { visibleSearch && (
        <div>
          <div>
            <input
              type="text"
              data-testid="search-input"
              className="input-search scale-in-tr"
            />
          </div>
          <div>
            <label htmlFor="ingredient">
              Ingredient
              <input
                type="radio"
                name="filters"
                id="ingredient"
                data-testid="ingredient-search-radio"
              />
            </label>
            <label htmlFor="name">
              Name
              <input
                type="radio"
                name="filters"
                id="name"
                data-testid="name-search-radio"
              />
            </label>
            <label htmlFor="firstletter">
              First Letter
              <input
                type="radio"
                name="filters"
                id="firstletter"
                data-testid="first-letter-search-radio"
              />
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
            >
              Search
            </button>
          </div>
        </div>
      ) }
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
