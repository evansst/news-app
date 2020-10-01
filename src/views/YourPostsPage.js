import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/Newsfeed/NewsFeed';
import { useSelector } from 'react-redux';




const YourPostsPage = props => {
  const { posts, ...rest} = props
  const [yourPosts, setYourPosts] = useState([])
  const user = useSelector(state => state.authentication.user.user)

  useEffect(() => {
    const yourPosts = posts.filter(post => {
      return post.user_id === user.id
    })

    setYourPosts(yourPosts)
  },[user, posts])


  return (
    <div>
      <NewsFeed posts={yourPosts} {...rest}/>
    </div>
  );
};

export default YourPostsPage;