import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/newsfeed/NewsFeed';
import { parseJSON, postsURL } from 'helpers/requestHelper'



const HomePage = props => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(postsURL)
      .then(parseJSON)
      .then(setPosts)
  },[])


  return (
    <div>
      <NewsFeed posts={posts} {...props}/>
    </div>
  );
};

export default HomePage;