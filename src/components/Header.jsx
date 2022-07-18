import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';

export default function Header({ title, hasSearch }) {
  const [visibleSearch, setVisibleSearch] = useState(false);

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
        {
          hasSearch
          && (
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
        }
      </div>
      {visibleSearch && <SearchBar /> }
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
