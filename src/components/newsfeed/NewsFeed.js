import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import NewsCard from './NewsCard';



const NewsFeed = props => {
  const { posts, user } = props
  const classes = useStyles()

  return (
    <Grid
      container
      className={classes.root}
      justify='center'
      spacing={3}
    >

        {posts.map(post => {
          return (
            <Grid item  key={post.url}>
              <NewsCard post={post} user={user}/>
            </Grid>
          )
        })}
    </Grid>
  );
};

export default NewsFeed;

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));