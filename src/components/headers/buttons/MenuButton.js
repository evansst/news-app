import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
  IconButton
} from '@material-ui/core';

import { makeStyles } from'@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

export default function MenuButton(props) {
  const classes = useStyles();

  return (
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
  );
};
