const sortTimeD = (postA, postB) => {
  const dateA = postA.date_published ? postA.date_published : postA.created_at
  const dateB = postB.date_published ? postB.date_published : postB.created_at
  return new Date(dateB) - new Date(dateA)
}

const sortTimeA = (postA, postB) => {
  const dateA = postA.date_published ? postA.date_published : postA.created_at
  const dateB = postB.date_published ? postB.date_published : postB.created_at
  return new Date(dateA) - new Date(dateB)
}

const sortUpVotesD = (postA, postB) => {
  return postB.up_votes.length - postA.up_votes.length
}

const sortUpVotesA = (postA, postB) => {
  return postA.up_votes.length - postB.up_votes.length
}

const sortDownVotesD = (postA, postB) => {
  return postB.down_votes.length - postA.down_votes.length
}

const sortDownVotesA = (postA, postB) => {
  return postA.down_votes.length - postB.down_votes.length
}

const sortFavoritesD = (postA, postB) => {
  return postB.favorites.length - postA.favorites.length
}

const sortFavoritesA = (postA, postB) => {
  return postA.favorites.length - postB.favorites.length
}

const sortControversyD = (postA, postB) => {
  return score(postB) - score(postA)
}
const sortControversyA = (postA, postB) => {
  return score(postA) - score(postB)
}

export const sortCallBack = {
  'timeD': sortTimeD,
  'timeA': sortTimeA,
  'upVotesD': sortUpVotesD,
  'upVotesA': sortUpVotesA,
  'downVotesD': sortDownVotesD,
  'downVotesA': sortDownVotesA,
  'favoritesD': sortFavoritesD,
  'favoritesA': sortFavoritesA,
  'controversyD': sortControversyD,
  'controversyA': sortControversyA,

  'default': sortTimeD,
}

const score = ({ up_votes, down_votes }) => {
  const wins = up_votes.length > down_votes.length ? up_votes.length : down_votes.length
  const losses = up_votes.length > down_votes.length ? down_votes.length : up_votes.length

  const ratio = losses / wins
  const total = wins + losses

  return total * ratio
}