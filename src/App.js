import configureStore from './store/config/configureStore.js'
import React, { useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
import { parseJSON, postsURL } from './helpers/requestHelper.js';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import User from 'layouts/User'
import { createBrowserHistory } from 'history';

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";


const store = configureStore();
store.subscribe(()=>{
  console.log(store.getState());
});

const history = createBrowserHistory();

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(postsURL)
      .then(parseJSON)
      .then(setPosts)
  },[])
  
  return (
    <div
      style={{
        backgroundColor: '#EEEEEE',
      }}
    >
      <Router history={history}>
        <Switch>
          <Route path="/user" component={User} />
          <Redirect from="/" to="/user/newsfeed" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
