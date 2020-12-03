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
import FilterListIcon from '@material-ui/icons/FilterList';


// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import { userActions } from '_actions'
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import { Close } from "@material-ui/icons";
import { grayColor } from "assets/jss/material-dashboard-pro-react";
import { categories, categoryIcons } from "helpers/categories";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const {
    searchTerm,
    searchPosts,
    setSearchTerm,
    sortPosts,
    filterPosts,
    clearFilter,
    rtlActive,
  } = props
  
  const [openProfile, setOpenProfile] = useState(null);
  const [openSort, setOpenSort] = useState(null)
  const [openFilter, setOpenFilter] = useState(null)
  const [sortColor, setSortColor] = useState('action')
  const [filterColor, setFilterColor] = useState('action')

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

  const handleClickFilter = event => {
    if (openFilter && openFilter.contains(event.target)) {
      setOpenFilter(null);
    } else {
      setOpenFilter(event.currentTarget);
    }
  };
  const handleCloseFilter = () => {
    setOpenFilter(null);
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
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Filter By"
          aria-owns={openSort ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickFilter}
          className={classes.buttonLink}
        >
          <FilterListIcon
            color={filterColor}
            className={
              classes.headerLinksSvg +
              " " +
              (classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickFilter}
              className={classes.linkText}
            >
              {"Filter By"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openFilter)}
          anchorEl={openFilter}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openFilter,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="filter-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseFilter}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => {
                        setFilterColor('action')
                        clearFilter()
                        handleCloseFilter()
                      }}
                      className={dropdownItem}
                    >
                      <Close />
                      <span>   </span>
                      Clear
                    </MenuItem>
                    <Divider/>
                    {categories.map(category => {
                      return (
                        <MenuItem
                          key={category + 'filter drop down'}
                          onClick={() => {
                            setFilterColor('error')
                            setSortColor('action')
                            filterPosts(category)
                            handleCloseFilter()
                          }}
                          className={dropdownItem}
                        >
                          {categoryIcons[category]}
                          <span>   </span>
                          {category}
                        </MenuItem>
                      )
                    })}
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
          justIcon
          aria-label="Sort By"
          aria-owns={openSort ? "notification-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickSort}
          className={classes.buttonLink}
        >
          <SortIcon
            color={sortColor}
            className={
              classes.headerLinksSvg +
              " " +
              (classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickSort}
              className={classes.linkText}
            >
              {"Sort By"}
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
              id="sort-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseSort}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('controversyD')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Most Controversial"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('controversyA')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Least Controversial"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('timeD')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Newest"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('timeA')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Oldest"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('upVotesD')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Up Votes (Descending)"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('upVotesA')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Up Votes (Ascending)"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('downVotesD')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Down Votes (Descending)"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('downVotesA')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Down Votes (Ascending)"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('favoritesD')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Most Loved"}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setSortColor('error')
                        sortPosts('favoritesA')
                        handleCloseSort()
                      }}
                      className={dropdownItem}
                    >
                      {"Least Loved"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
        <Button
          id="search-button"
          type="submit"
          color="white"
          aria-label="edit"
          justIcon
          round
          className={searchButton}
          onClick={() => {
            searchPosts(searchTerm)
            setSortColor('action')
          }}
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
                      setSortColor('action')
                      setFilterColor('action')
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
          color="white"
          aria-label="Person"
          justIcon
          round
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
