import React, { useState } from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import { useSelector } from 'react-redux';

import { newVote } from 'helpers/voteRequestHelper'

import { dangerColor } from 'assets/jss/material-dashboard-pro-react'
import Card from 'components/Card/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Menu, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { newFavorite } from 'helpers/favoriteRequestHelper';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';




const NewsCard = props => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user.user)
  const [post, setPost] = useState(props.post)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleUpVoteClick = () => {
    setPost(newVote(user)(post)('up'))
  }
  
  const handleDownVoteClick = () => {
    setPost(newVote(user)(post)('down'))
  }

  const handleFavoriteClick = () => {
    setPost(newFavorite(user)(post))
  }

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMoreClose = () => {
    setAnchorEl(null)
  }

  return (
    <GridItem xs={12} sm={6} md={6} lg={4} xl={4} >

    
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
                {post.user_id === user.id
                  ? (
                    <MenuItem key='remove' onClick={() => {
                      handleMoreClose()
                      //delete most
                    }}>
                      Delete
                    </MenuItem>
                  )
                  : null
                }
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
        {/* <CardActions > */}
          <GridContainer direction="row" justify="space-between">
            <GridItem xs={3}>
              <GridContainer>
                <GridItem xs={6}>
                  <IconButton
                    aria-label="up vote"
                    onClick={handleUpVoteClick}
                    color={
                      post.up_votes.find(up_vote => up_vote.user_id === user.id)
                      ? "secondary"
                      : "default"
                    }
                      >
                    <small style={{ fontSize: '14px' }}>{post.up_votes.length}</small>
                    <KeyboardArrowUp />
                  </IconButton>

                </GridItem>
                <GridItem xs={6}>
                  <IconButton
                    aria-label="down vote"
                    onClick={handleDownVoteClick}
                    color={
                      post.down_votes.find(down_vote => down_vote.user_id === user.id)
                      ? "secondary"
                      : "default"
                    }
                    >
                    <KeyboardArrowDown />
                    <small style={{ fontSize: '14px' }}>{post.down_votes.length}</small>
                  </IconButton>

                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={3}>
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavoriteClick}
                color={
                  post.favorites.find(favorite => favorite.user_id === user.id)
                  ? "secondary"
                  : "default"
                }
                >
                <FavoriteIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        {/* </CardActions> */}
      </Card>
    </GridItem>
  );
};

export default NewsCard;

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 350,
    // maxWidth: 475,
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
    backgroundColor: dangerColor[0],
  },
}));