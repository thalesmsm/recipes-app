import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { doneRecipesRead } from '../utils/doneRecipesStorage';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const done = doneRecipesRead();
  const [copied, setCopied] = useState([]);
  // const [filtered, setFiltered] = ('all');

  const handleClick = (event) => {
    const { target } = event;
    setFiltered(target.value);
  };

  // const filterByAllTypes = () => {
  //   if (filtered === 'all') return done;
  // };

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
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ (event) => handleClick(event) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ (event) => handleClick(event) }
      >
        Drinks
      </button>
      {
        done
      && (done.map((card, index) => (
        <div key={ index }>
          <img
            src={ card.image }
            alt={ card.name }
            data-testid={ `${index}-horizontal-image` }
          />
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
          { copied.includes(card.id) && <p>Link copied!</p> }
          <h2
            data-testid={ `${index}-horizontal-name` }
          >
            {card.name}
          </h2>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { card.type === 'food'
              ? `${card.nationality} - ${card.category}`
              : card.alcoholicOrNot}
          </h3>

          <h3
            data-testid={ `${index}-horizontal-done-date` }
          >
            { card.doneDate }
          </h3>
          { card.tags.map((tag) => (
            <div key={ index }>
              <h4
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </h4>
            </div>
          )) }
        </div>))
      )
      }
    </div>
  );
}
export default DoneRecipes;
