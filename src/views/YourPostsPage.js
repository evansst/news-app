import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/newsfeed/NewsFeed';
import { parseJSON, postsURL } from 'helpers/requestHelper'
import { useSelector } from 'react-redux';




const YourPostsPage = props => {
  const [posts, setPosts] = useState([])
  const user = useSelector(state => state.authentication.user.user)

  useEffect(() => {
    
    fetch(postsURL)
      .then(parseJSON)
      .then(posts => {
        return posts.filter(post => {
          return post.user_id === user.id
        })
      })
      .then(setPosts)
  },[user])


  return (
    <div>
      <NewsFeed posts={posts} {...props}/>
    </div>
  );
};

export default YourPostsPage;