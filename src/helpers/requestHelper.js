export const baseURL = 'http://localhost:3000'
export const usersURL = `${baseURL}/users`
export const postsURL = `${baseURL}/posts`
export const upVoteURL = `${baseURL}/up_votes`
export const loginURL = `${baseURL}/login`

export const parseJSON = (response) => response.json()

export function login(event) {
  const username = event.target.username.value;
  const password = event.target.password.value;

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


export function checkResponse(response) {
  const { user, token, message } = response;
    
  if(message) {
    alert(message);
  } else {
    saveUser(user)(token)
  }
}

const saveUser = (user) => {
  localStorage.setItem('username', user.username);
  localStorage.setItem('user_id', user.id);
  
  return (token) => localStorage.setItem('token', token);
}