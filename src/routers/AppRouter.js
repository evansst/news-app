
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
            <LandingPage articles={props.articles}/>
          </Route>


        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;