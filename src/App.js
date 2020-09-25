import configureStore from './store/config/configureStore.js'
import React, { useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';
import { parseJSON, postsURL } from './helpers/requestHelper.js';
import { CssBaseline } from '@material-ui/core';
import { grayColor } from './assets/material-kit-react.js';
import { minHeight } from '@material-ui/system';


const store = configureStore();
store.subscribe(()=>{
  console.log(store.getState());
});

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
        backgroundColor: grayColor,
      }}
    >
      <CssBaseline />
      <AppRouter posts={posts}/>
    </div>
  );
}

export default App;
