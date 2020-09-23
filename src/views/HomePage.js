import React from 'react';
import MenuAppBar from '../components/MenuAppBar';
import NewsFeed from '../components/NewsFeed';

const HomePage = props => {
  const { posts, user } = props

  return (
    <div>
      <MenuAppBar />
      <NewsFeed posts={posts} user={user}/>
      
    </div>
  );
};

export default HomePage;