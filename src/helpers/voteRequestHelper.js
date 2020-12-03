import { authHeader } from "_helpers"
import { upVoteURL, downVoteURL } from "./requestHelper"
import { userService } from "_services"


export const newVote = (user) => {


  return (post) => {
    return (vote) => {

      post = checkVotes(user)(post)(vote)

      return post
    }
  }
}

const checkVotes = (user) => {
  return (post) => {
    return (vote) => {
      const up_vote = post.up_votes.find(up_vote => up_vote.user_id === user.id)
      const down_vote = post.down_votes.find(down_vote => down_vote.user_id === user.id)

      const UpVote = () => {
        if(up_vote) post = deleteUpVote(up_vote)(user)(post)
        if(down_vote) post = deleteDownVote(down_vote)(user)(post)
        if(!up_vote) post = sendNewUpVote(user)(post)
        
        return post
      }
      const DownVote = () => {
        if(up_vote) post = deleteUpVote(up_vote)(user)(post)
        if(down_vote) post = deleteDownVote(down_vote)(user)(post)
        if(!down_vote) post = sendNewDownVote(user)(post)

        return post
      }
      const voteServices = {
        'up': UpVote,
        'down': DownVote,
      }

      return voteServices[vote]()
    }
  }
}


const sendNewUpVote = (user) => {
  return (post) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        up_vote: {
          user_id: user.id,
          post_id: post.id,
        }
      })
    }

    fetch(upVoteURL, requestOptions).then(handleResponse)
    return {
      ...post,
      up_votes: post.up_votes.concat({
        id: null,
        user_id: user.id,
        post_id: post.id
      })
    }
  }
}

const sendNewDownVote = (user) => {
  return (post) => {
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        down_vote: {
          user_id: user.id,
          post_id: post.id,
        }
      })
    }

    fetch(downVoteURL, requestOptions).then(handleResponse)
    return {
      ...post,
      down_votes: post.down_votes.concat(
        {
          id: null,
          user_id: user.id,
          post_id: post.id
        }
      )
    }
  }
}

const deleteUpVote = (up_vote) => {
  return (user) => {
    return (post) => {
      fetch(upVoteURL, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          post_id: post.id,
        })
      })
      return {
        ...post,
        up_votes: post.up_votes.filter(up_vote => up_vote.user_id !== user.id)
      }
    }
  }
}

const deleteDownVote = (down_vote) => {
  return (user) => {
    return (post) => {
      fetch(downVoteURL, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          post_id: post.id,
        })
      })
      return {
        ...post, 
        down_votes: post.down_votes = post.down_votes.filter(down_vote => down_vote.user_id !== user.id)
      }
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