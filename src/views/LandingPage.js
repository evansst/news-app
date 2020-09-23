import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import NewsFeed from '../components/NewsFeed';


const LandingPage = (props) => {
  return (
    <div>
      <MenuAppBar />
      <NewsFeed articles={props.articles} />
      
    </div>
  );
};

export default LandingPage;