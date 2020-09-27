import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import User from 'layouts/User'
import Auth from 'layouts/Auth'

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";


const App = () => {

  return (
    <div
      style={{
        // backgroundColor: '#EEEEEE',
        // backgroundImage: "url(" + newspapers + ")",
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/auth" component={Auth} />
          <Redirect from="/" to="/user/newsfeed" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
