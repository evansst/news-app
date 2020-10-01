import React, { useState } from 'react';
import { ReactTinyLink } from 'react-tiny-link'
import { useSelector } from 'react-redux';

import { dangerColor } from 'assets/jss/material-dashboard-pro-react'
import Card from 'components/Card/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Menu, MenuItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer';


import { categoryIcons } from 'helpers/categories'




const CounterPostCard = props => {
  const classes = useStyles();
  const user = useSelector(state => state.authentication.user.user)
  // eslint-disable-next-line no-unused-vars
  const [post, setPost] = useState(props.post)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMoreClose = () => {
    setAnchorEl(null)
  }

  return (
      <Card className={classes.root}  >
        <CardHeader
          avatar={
            <Avatar aria-label='title' className={classes.avatar}>
              {
                categoryIcons[post.category]
                  ? categoryIcons[post.category]
                  : categoryIcons['default']
              }
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
                    <MenuItem key='delete' onClick={() => {
                      handleMoreClose()
                      //delete 
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
          subheader={"Counter Post"}
        />
        <CardContent>
          <ReactTinyLink
            url={post.url}
            cardSize="large"
            showGraphic={true}
            maxLine={3}
            minLine={3}
            />
        </CardContent>
          <GridContainer direction="row" justify="space-between">
            <IconButton></IconButton>
          </GridContainer>
        </Card>
  );
};

export default CounterPostCard;

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
    backgroundColor: dangerColor[0],
  },
}));
