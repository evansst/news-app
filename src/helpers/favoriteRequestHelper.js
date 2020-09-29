import { userService } from "_services"
import { favoritesURL } from "./requestHelper"

export const newFavorite = (user) => {
  return (post) => {
    const favorite = post.favorites.find(favorite => favorite.user_id === user.id) 

    return favorite
      ? deleteFavorite(favorite)(user)(post)
      : sendNewFavorite(user)(post) 
  }
}

const deleteFavorite = (favorite) => {
  return (user) => {
    return (post) => {
      fetch(favoritesURL, {
        method: "DELETE",
        headers:  {'Content-Type': "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          post_id: post.id
        })
      })
      
      const filteredFavorites = post.favorites.filter(favorite => favorite.user_id !== user.id)
      return {
        ...post,
        favorites: filteredFavorites,
      }
    }
  }
}

const sendNewFavorite = (user) => {
  return (post) => {
    const newFavorite = { user_id: user.id, post_id: post.id}
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        favorite: newFavorite
      })
    }

    fetch(favoritesURL, requestOptions).then(handleResponse)
    return {
      ...post,
      favorites: post.favorites.concat(newFavorite)
    }
  }

}

function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              userService.logout();
              window.location.reload(false);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      
      return data;
  });

}