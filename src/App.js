import configureStore from './store/config/configureStore.js'
import React, { useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';
import { parseJSON, postsURL } from './helpers/requestHelper.js';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { grayColor } from './assets/material-kit-react.js';


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
        backgroundColor: grayColor
      }}
    >
      <ThemeProvider >
        <CssBaseline />
        <AppRouter posts={posts}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
