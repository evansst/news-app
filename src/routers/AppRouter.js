
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import HomePage from '../views/HomePage';
import LandingPage from '../views/LandingPage';


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


        </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;