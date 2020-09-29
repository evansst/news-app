
import { postConstants } from '_constants'
import { postService } from '_services'
import { alertActions } from './alert.actions'


const newPost = (post, from, history) => {
  const request = (post) =>  { return { type: postConstants.POST_REQUEST, post } }
  const success = (post) =>  { return { type: postConstants.POST_SUCCESS, post } }
  const failure = (post) =>  { return { type: postConstants.POST_FAILURE, post } }

  return dispatch => {
    dispatch(request({ post }));

    postService.newPost(post)
      .then(
        post => {
          dispatch(success(post))
          history.push(from)
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }
}

export const postActions = {
  newPost,
}