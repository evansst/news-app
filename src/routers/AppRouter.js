
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import LandingPage from '../views/LandingPage';


const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>


        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;