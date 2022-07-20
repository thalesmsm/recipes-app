import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const user = localStorage.getItem('user');
  const history = useHistory();

  return (
    <div>
      <div>
        <Header title="Profile" />
        <h1 data-testid="profile-email">{ user }</h1>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
