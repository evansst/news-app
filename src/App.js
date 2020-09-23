import configureStore from './store/config/configureStore.js'
import React, { useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';
import { parseJSON, postsURL } from './helpers/requestHelper.js';


const store = configureStore();
store.subscribe(()=>{
  console.log(store.getState());
});

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(postsURL)
      .then(parseJSON)
      .then(setPosts)
  },[])
  
  return (
    <AppRouter articles={posts}/>
  );
}

export default App;
