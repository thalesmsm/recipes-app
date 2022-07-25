import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { favoriteRecipesRead,
  removeFavoriteRecipes } from '../utils/favoritesRecipesStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../css/TypeButtons.css';
import '../css/MiniCards.css';

export default function FavoriteRecipe() {
  const done = favoriteRecipesRead();
  const [linkCopied, setLinkCopied] = useState(false);
  const [filtered, setFiltered] = useState('all');
  const history = useHistory();

  const handleClick = (event) => {
    const { target } = event;
    setFiltered(target.value);
  };

  const handleClickRmvFav = (id) => {
    removeFavoriteRecipes(id);
    setFiltered('all');
    history.push('/favorite-recipes');
  };

  useEffect(() => {
    handleClickRmvFav();
  }, []);

  const filterByAllTypes = () => {
    if (filtered === 'all') return done;

    return done.filter(({ type }) => type === filtered);
  };

  const shareButton = (id, type) => {
    const time = 2000;
    setLinkCopied(true);

    if (type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }

    setTimeout(() => {
      setLinkCopied(false);
    }, time);
  };
  return (
    <div>
      <Header title="Favorite Recipes" />
      <div className="category-buttons">
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
      </div>
      <div className="container">
        {
          filterByAllTypes()
        && (filterByAllTypes().map((card, index) => (
          <div key={ index } className="done-container">
            <Link to={ card.type === 'food' ? `foods/${card.id}` : `drinks/${card.id}` }>
              <img
                src={ card.image }
                alt={ card.name }
                data-testid={ `${index}-horizontal-image` }
                className="done-img"
              />
            </Link>
            <div className="done-infos">
              <Link
                to={ card.type === 'food'
                  ? `foods/${card.id}` : `drinks/${card.id}` }
              >
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  {card.name}
                </h2>
              </Link>
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                { card.type === 'food'
                  ? `${card.nationality} - ${card.category}`
                  : card.alcoholicOrNot}
              </h3>
              <div className="buttons">
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
                  style={ { marginLeft: '18px' } }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="favorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
              { linkCopied && <p className="slide-bottom">Link copied!</p> }

            </div>
          </div>
        ))
        )
        }
      </div>
    </div>
  );
}
