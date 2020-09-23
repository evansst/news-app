import { Box, Container } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import React from 'react';
import NewsCard from './NewsCard';


const NewsFeed = props => {
  const { articles } = props

  return (
    <Container>
      {articles.map(article => {
        return <NewsCard article={article} key={article.url}/>
      })}
    </Container>
  );
};

export default NewsFeed;