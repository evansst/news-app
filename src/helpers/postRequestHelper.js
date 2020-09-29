import { authHeader } from "_helpers"
import { postsURL } from "./requestHelper"
import { userService } from "_services"

export const newPost = (post) => {
  console.log(post)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  }

  fetch(postsURL, requestOptions)
    .then(handleResponse)
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