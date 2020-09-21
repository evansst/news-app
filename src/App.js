import configureStore from './store/config/configureStore.js'
import React from 'react';
import { Provider } from 'react-redux';


const store = configureStore();
store.subscribe(()=>{
  console.log(store.getState());
});

function App() {
  return (
    <Provider store={store}>
      
    </Provider>
  );
}

export default App;
