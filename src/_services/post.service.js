import { postsURL } from 'helpers/requestHelper'
import { authHeader } from '_helpers'
import { userService } from './user.service'




const getAll = () => {
  const requestOptions = {
    method: 'GET', 
    headers: authHeader(),
  }

  return fetch(postsURL, requestOptions).then(handleResponse)
}

const getById = (id) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`${postsURL}/${id}`, requestOptions).then(handleResponse)
}

const newPost = (post) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }

  return fetch(postsURL, requestOptions).then(handleResponse)
}

const deletePost = (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader()
  };

  return fetch(`${postsURL}/${id}`, requestOptions).then(handleResponse)
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

export const postService = {
  getAll,
  getById,
  newPost,
  deletePost,
}