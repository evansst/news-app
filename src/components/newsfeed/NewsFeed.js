import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import BarLoader from 'react-spinners/BarLoader'
import { dangerColor } from 'assets/jss/material-dashboard-pro-react';





const NewsFeed = props => {

  const classes = useStyles()
  const [slice, setSlice] = useState(6)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState([])
  const [placeHolder, setPlaceHolder] = useState(barloader)

  const addSlice = () => {
    if(!props.posts.length){
      setPlaceHolder(noResults)
    } else {
      setPlaceHolder(barloader)
      setPosts([
        ...posts,
        props.posts.slice(slice, slice + 3).map(post => {
          return <NewsCard key={post.url} post={post} />
        })
      ])
      if(slice >= props.posts.length) setHasMore(false)   

      setSlice(slice + 3)
    }
  }


  useEffect(() => {
    setPosts(
      props.posts.slice(0, 6).map(post => {
        return <NewsCard key={post.url} post={post} />
      })
    )

    setHasMore(true)

  }, [props.posts])



  return (
    <InfiniteScroll
      dataLength={posts.slice(0, slice).length}
      next={addSlice}
      scrollableTarget="main-panel"
      scrollThreshold={0.9}
      hasMore={hasMore}
      loader={placeHolder}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>That's it!</b>
        </p>
      }
    >
      <Grid
        container
        className={classes.root}
        justify='center'
      >
        {posts}
      </Grid>
    </InfiniteScroll>
  );
};

export default NewsFeed;

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));

const noResults = 
  <h3 style={{ textAlign: 'center' }}>
    No Results...
  </h3>

const barloader =
  <div style={{
    paddingTop: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }}>
    <BarLoader
      loading={true}
      color={dangerColor[0]}
      height={5}
      width={'60vw'}
    />
  </div>