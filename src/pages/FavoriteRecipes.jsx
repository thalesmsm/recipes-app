import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { favoriteRecipesRead,
  removeFavoriteRecipes } from '../utils/favoritesRecipesStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipe() {
  const done = favoriteRecipesRead();
  const [copied, setCopied] = useState([]);
  const [filtered, setFiltered] = useState('all');

  const handleClick = (event) => {
    const { target } = event;
    setFiltered(target.value);
  };

  const handleClickRmvFav = (id) => {
    removeFavoriteRecipes(id);
    setFiltered('all');
  };

  useEffect(() => {
    handleClickRmvFav();
  }, []);

  const filterByAllTypes = () => {
    if (filtered === 'all') return done;

    return done.filter(({ type }) => type === filtered);
  };

  const shareButton = (id, type) => {
    if (type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    setCopied((prev) => [...prev, id]);
  };
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ (event) => handleClick(event) }
        value="all"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ (event) => handleClick(event) }
        value="food"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (event) => handleClick(event) }
        value="drink"
      >
        Drinks
      </button>
      {
        filterByAllTypes()
      && (filterByAllTypes().map((card, index) => (
        <div key={ index }>
          <Link to={ card.type === 'food' ? `foods/${card.id}` : `drinks/${card.id}` }>
            <img
              src={ card.image }
              alt={ card.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              {card.name}
            </h2>
          </Link>
          <button
            type="button"
            onClick={ () => shareButton(card.id, card.type) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button
            type="button"
            onClick={ () => handleClickRmvFav(card.id) }
          >
            <img
              src={ blackHeartIcon }
              alt="favorite"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          { copied.includes(card.id) && <p>Link copied!</p> }
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { card.type === 'food'
              ? `${card.nationality} - ${card.category}`
              : card.alcoholicOrNot}
          </h3>
        </div>
      ))
      )
      }
    </div>
  );
}
