import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/newsfeed/NewsFeed';
import { parseJSON, postsURL } from 'helpers/requestHelper'
import { useSelector } from 'react-redux';




const FavoritesPage = props => {
  const [posts, setPosts] = useState([])
  const user = useSelector(state => state.authentication.user.user)

  useEffect(() => {
    
    fetch(postsURL)
      .then(parseJSON)
      .then(posts => {
        return posts.filter(post => {
          return (post.favorites.find(favorite => favorite.user_id === user.id))
        })
      })
      .then(setPosts)
  },[user])


  return (
    <div>
      {posts.length
        ? <NewsFeed posts={posts} {...props}/>
        : <h3>You haven't saved any posts yet!</h3>
      }
    </div>
  );
};

export default FavoritesPage;