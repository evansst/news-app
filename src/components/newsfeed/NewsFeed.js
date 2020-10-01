import React, { useState, useEffect } from 'react';

import NewsCard from '../Card/NewsCard';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CounterPostCard from 'components/Card/CounterPostCard';

import InfiniteScroll from 'react-infinite-scroll-component';
import BarLoader from 'react-spinners/BarLoader'

import { makeStyles } from '@material-ui/core/styles';
import { dangerColor } from 'assets/jss/material-dashboard-pro-react';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

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
          return newsCard(post)
        })
      ])
      if(slice >= props.posts.length) setHasMore(false)   

      setSlice(slice + 3)
    }
  }

  const newsCard = (post) => {
    return (
      post.counter_post
      ? (
        <GridItem key={post.url} xs={12} sm={12} md={12} lg={12} xl={12}>
          <GridContainer direction="row" justify="center" alignItems="center" >
            <GridItem xs={12} sm={5}>
              <NewsCard post={post} />
            </GridItem>
            <GridItem xs 
              style={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <CompareArrowsIcon
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  fontSize: '120px'
                }} 
              />
            </GridItem>
            <GridItem xs={12} sm={5}>
              <CounterPostCard post={post.counter_post} />
            </GridItem>
          </GridContainer>
        </GridItem>
      ) : (
        <GridItem key={post.url} xs={12} sm={12} md={7} lg={7} xl={5} >
          <NewsCard  post={post} />
        </GridItem>
      )
    )
  }

  useEffect(() => {
    setPosts(
      props.posts.slice(0, 6).map(post => {
        return newsCard(post)
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
      <GridContainer
        className={classes.root}
        justify='center'
      >
        {posts}
      </GridContainer>
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