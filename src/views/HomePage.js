import React, {  } from 'react';
import NewsFeed from '../components/newsfeed/NewsFeed';



const HomePage = props => {


  return (
    <div>
      <NewsFeed {...props}/>
    </div>
  );
};

export default HomePage;