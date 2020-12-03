export const baseURL = 'http://localhost:3000'
export const usersURL = `${baseURL}/users`
export const postsURL = `${baseURL}/posts`
export const upVoteURL = `${baseURL}/up_votes`
export const downVoteURL = `${baseURL}/down_votes`
export const favoritesURL = `${baseURL}/favorites`
export const loginURL = `${baseURL}/login`

export const parseJSON = (response) => response.json()

export async function getUser() {
  const user_id = localStorage.user_id

  if(user_id) {
    return await fetch(`${usersURL}/${user_id}`).then(parseJSON).then(checkResponse)
  } else {
    return null;
  }
}

export async function login(event) {
  const username = event.target.username.value;
  const password = event.target.password.value;

  return await
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(parseJSON)
      .then(checkResponse)
}   

export async function createUser(event) {
  const username = event.target.username.value
  const email = event.target.email.value
  const password = event.target.email.value

  return await
    fetch(usersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
}


export function checkResponse(response) {
  const { user, token } = response;

  if(user) saveUser(user)(token)
  return response;
}

const saveUser = (user) => {
  localStorage.setItem('username', user.username);
  localStorage.setItem('user_id', user.id);
  
  return (token) => localStorage.setItem('token', token);
}

