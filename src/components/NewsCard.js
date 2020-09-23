import React from 'react';
import { ReactTinyLink } from 'react-tiny-link'

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';


const NewsCard = props => {
  const { article } = props
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label='title' className={classes.avatar}>
            {article.title.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.title}
        subheader={`Posted on ${article.posted_date}`}
       />
       <CardContent>
         <ReactTinyLink
           url={article.url}
           cardSize="large"
           showGraphic={true}
           maxLine={5}
           minLine={3}
          />
       </CardContent>
       <CardActions disableSpacing>
         <IconButton aria-label="up vote">
           <KeyboardArrowUp />
         </IconButton>

         <IconButton aria-label="down vote">
           <KeyboardArrowDown />
         </IconButton>

         <IconButton aria-label="add to favorites">
          <FavoriteIcon />
         </IconButton>
       </CardActions>
    </Card>
  );
};

export default NewsCard;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));