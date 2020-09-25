
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import HomePage from '../views/HomePage';
import LandingPage from '../views/LandingPage';
import LoginPage from '../views/LoginPage';


const AppRouter = (props) => {
  const { posts, user } = props
  return (
    <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <LandingPage/>
          </Route>

          <Route exact path="/home">
            <HomePage posts={posts} />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>


        </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;