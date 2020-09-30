import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/newsfeed/NewsFeed';
import { useSelector } from 'react-redux';




const FavoritesPage = props => {
  const { posts, setSearchTerm, searchPosts, ...rest} = props
  const [favorites, setFavorites] = useState([])
  const user = useSelector(state => state.authentication.user.user)

  useEffect(() => {
    const favorites = posts.filter(post => {
      return (post.favorites.find(favorite => favorite.user_id === user.id))
    })
    setFavorites(favorites)


  },[user, posts])


  return (
    <div>
      {favorites.length
        ? <NewsFeed posts={favorites} {...rest}/>
        : <h3>You haven't saved any posts yet!</h3>
      }
    </div>
  );
};

export default FavoritesPage;