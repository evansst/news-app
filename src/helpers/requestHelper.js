export const baseURL = 'http://localhost:3000'
export const usersURL = `${baseURL}/users`
export const postsURL = `${baseURL}/posts`
export const upVoteURL = `${baseURL}/up_votes`

export const parseJSON = (response) => response.json()