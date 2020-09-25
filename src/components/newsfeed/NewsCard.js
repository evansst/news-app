import React, { useState } from 'react';
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
import { upVoteURL } from '../../helpers/requestHelper';
import { Menu, MenuItem } from '@material-ui/core';


const NewsCard = props => {
  const { post, user } = props
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleUpVoteClick = () => {
    console.log('up-vote clicked!')
    // fetch(upVoteURL, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //   },
    //   body: {
    //     up_vote: {
    //       user_id: user.id,
    //       post_id: post.id
    //     }
    //   }
    // }) 
  }

  const handleDownVoteClick = () => {
    console.log('down-vote clicked!')
  }

  const handleFavoriteClick = () => {
    console.log('favorite clicked!')
  }

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMoreClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label='title' className={classes.avatar}>
            {post.title.charAt(0)}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMoreClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu 
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleMoreClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                }
              }}
            >
              <MenuItem key='report' onClick={() => {
                handleMoreClose()
                // do something else
              }}>
                Report
              </MenuItem>
            </Menu>
          </>
        }
        title={post.title}
        subheader={`Posted on ${post.created_at.split('T')[0]}`}
       />
       <CardContent>
         <ReactTinyLink
           url={post.url}
           cardSize="large"
           showGraphic={true}
           maxLine={5}
           minLine={3}
          />
       </CardContent>
       <CardActions disableSpacing>
         <IconButton aria-label="up vote" onClick={handleUpVoteClick}>
           <KeyboardArrowUp />
         </IconButton>

         <IconButton aria-label="down vote" onClick={handleDownVoteClick}>
           <KeyboardArrowDown />
         </IconButton>

         <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
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