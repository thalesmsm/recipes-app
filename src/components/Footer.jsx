import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

export default function Footer() {
  return (
    <footer
      className="footer-container"
      data-testid="footer"
    >
      <Link to="/foods">
        <button type="button" className="foods-btn">
          <img
            src={ mealIcon }
            alt="dirnk-icon"
            data-testid="foods-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/drinks">
        <button type="button" className="drinks-btn">
          <img
            src={ drinkIcon }
            alt="dirnk-icon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
}
