import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodsDetails from './pages/FoodsDetails';
import FoodsInProgress from './pages/FoodsInProgress';
import Drinks from './pages/Drinks';
import DrinksDetails from './pages/DrinksDetails';
import DrinksInProgress from './pages/DrinksInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/foods" exact component={ Foods } />
        <Route path="/foods/:id" exact component={ FoodsDetails } />
        <Route path="/foods/:id/in-progress" exact component={ FoodsInProgress } />
        <Route path="/drinks" exact component={ Drinks } />
        <Route path="/drinks/:id" exact component={ DrinksDetails } />
        <Route path="/drinks/:id/in-progress" exact component={ DrinksInProgress } />
        <Route path="/done-recipes" exact component={ DoneRecipes } />
        <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
        <Route path="/profile" exact component={ Profile } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
