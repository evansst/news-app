import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment"


// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";
import SortIcon from '@material-ui/icons/Sort';


// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import { userActions } from '_actions'
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import { Close } from "@material-ui/icons";
import { grayColor } from "assets/jss/material-dashboard-pro-react";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { searchTerm, searchPosts, setSearchTerm, rtlActive } = props
  
  const [openProfile, setOpenProfile] = useState(null);
  const [openSort, setOpenSort] = useState(null)

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const handleClickSort = event => {
    if (openSort && openSort.contains(event.target)) {
      setOpenSort(null);
    } else {
      setOpenSort(event.currentTarget);
    }
  };
  const handleCloseSort = () => {
    setOpenSort(null);
  };


  const classes = useStyles();
  const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive
    });
  const dropdownItem = classNames(classes.dropdownItem, classes.dangerHover, {
    [classes.dropdownItemRTL]: rtlActive
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });

  return (
    <div className={wrapper}>
        <Button
          id="search-button"
          type="submit"
          color="white"
          aria-label="edit"
          justIcon
          round
          className={searchButton}
          onClick={() => searchPosts(searchTerm)}
          >
          <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
        </Button>
        <span style={{ padding: '3px' }}/>
        <CustomInput
          formControlProps={{
            className: classes.top + " " + classes.search
          }}
          inputProps={{
            onChange: event => {
              const { value } = event.target
              setSearchTerm(value)
            },
            value: searchTerm,
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
              className: classes.searchInput,
            },
            endAdornment: 
              <InputAdornment position="end" >
                <Close
                    onClick={() => {
                    if(searchTerm) {
                      setSearchTerm('')
                      searchPosts('')
                    }
                  }}
                  style={{
                    color: grayColor[3],
                    cursor: 'pointer'
                  }}
                  />
              </InputAdornment>
          }}
          />

<div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openSort ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickSort}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        >
          <SortIcon
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickSort}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openSort)}
          anchorEl={openSort}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openSort,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseSort}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseSort}
                      className={dropdownItem}
                    >
                      {rtlActive
                        ? "إجلاء أوزار الأسيوي حين بل, كما"
                        : "Mike John responded to your email"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className={managerClasses}>
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
  
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {"Profile"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {"Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {"Settings"}
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={() => {
                        userActions.logout()
                        handleCloseProfile()
                        window.location.reload(false)
                      }}
                      className={dropdownItem}
                      >
                      {"Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool
};
