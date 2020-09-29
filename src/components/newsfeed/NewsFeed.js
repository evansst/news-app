import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import React from 'react';
import NewsCard from './NewsCard';



const NewsFeed = props => {
  const classes = useStyles()
  const { posts } = props

  return (
    <Grid
      container
      className={classes.root}
      justify='center'
      spacing={3}
    >

        {posts 
          ? posts.map(post => {
            return (
              <Grid item  key={post.url}>
                <NewsCard post={post} />
              </Grid>
            )
          })
          : null
        }
    </Grid>
  );
};

export default NewsFeed;

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
}));