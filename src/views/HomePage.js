import React, { useState, useEffect} from 'react';
import Header from 'components/Header/Header'
import AccountButton from 'components/headers/buttons/AccountButton';
import NewsFeed from '../components/newsfeed/NewsFeed';
import { parseJSON, postsURL } from 'helpers/requestHelper'
const HomePage = props => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(postsURL)
      .then(parseJSON)
      .then(setPosts)
  },[])

  return (
    <div>
      <NewsFeed posts={posts} user={user}/>
      
    </div>
  );
};

export default HomePage;