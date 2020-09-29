import React, { useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PrivateRoute } from '_components';

import User from 'layouts/User'
import Auth from 'layouts/Auth'

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";


const App = () => {
  const history = useHistory();
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch, history]);

  return (
    <div className="jumbotron">
      <div className="container">
        <div className="col-md-8 offset-md-2">
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <BrowserRouter>
              <Switch>
                <PrivateRoute path="/user" component={User} history={history} />
                <Route path="/auth" component={Auth} history={history} />
                <Redirect from="*" to="/user/newsfeed" />
              </Switch>
            </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
