import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import InfiniteScroll from 'react-infinite-scroll-component';



const NewsFeed = props => {
  const classes = useStyles()
  const [slice, setSlice] = useState(9)
  const [posts, setPosts] = useState([])

  const addSlice = () => {
    console.log('addSlice called!')
    setSlice(slice + 9)
  }

  useEffect(() => {
    setPosts(
      props.posts.slice(0, slice)
    )

  },[props.posts, slice])

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={addSlice}
      scrollableTarget="main-panel"
      scrollThreshold={0.95}
      hasMore={true}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Grid
        container
        className={classes.root}
        justify='center'
      >
        {posts 
          ? posts.map(post => {
            return (
              <NewsCard key={post.url} post={post} />
              )
            })
            : null
          }
      </Grid>
    </InfiniteScroll>
  );
};

export default NewsFeed;

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));