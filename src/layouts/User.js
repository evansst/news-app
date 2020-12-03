import React, { useState, useEffect } from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { parseJSON, postsURL } from 'helpers/requestHelper'

import { sortCallBack } from 'helpers/sortHelper'



const useStyles = makeStyles(styles);

export default function UserLayout(props) {

  // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const [logo] = useState(require("assets/img/logo-white (1).png"));
  const [allPosts, setAllPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const setSearch = (value) => {
    setSearchTerm(value)
  }

  const searchPosts = (value) => {
    if(value){
      const filteredPosts = allPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(value.toLowerCase()) ||
          (post.description && post.description.toLowerCase().includes(value.toLowerCase())) ||
          (post.category.toLowerCase().includes(value))
        )
      })
      setPosts(filteredPosts)
    } else {
      setPosts(allPosts)
    }
  }

  const sortPosts = (sortBy) => {
    const sortedPosts = [...posts]
    setPosts(sortedPosts.sort(sortCallBack[sortBy]))
  }

  const filterPosts = (category) => {
    searchTerm
      ? setPosts(posts.filter(post => post.category === category))
      : setPosts(allPosts.filter(post => post.category === category))
  }

  const clearFilter = () => {
    setPosts(allPosts)
  }
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
    
  const unlisten = props.history.listen((location, action) => {
    setSearchTerm('')
    searchPosts('')
  })

  useEffect(() => {

    //fetch all the posts
    fetch(postsURL)
      .then(parseJSON)
      .then(posts => {
        const sortedPosts = posts.sort(sortCallBack['upVotesD'])
        setPosts(sortedPosts)
        setAllPosts(sortedPosts)
      })
  
    // Specify how to clean up after this effect:
    return function cleanup() {
      unlisten()
    };
    // eslint-disable-next-line
  }, [props.history]);
  // functions for changeing the states from components

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = routes => {
    let activeRoute = "Inside Scoop";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                posts={posts}
                searchTerm={searchTerm}
                setSearchTerm={setSearch}
                searchPosts={searchPosts}

                {...props}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };


  // clear anything in the search bar

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Inside Scoop"}
        logo={logo}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"red"}
        bgColor={"black"}
        miniActive={miniActive}
        {...props}
      />
      <div
        id="main-panel"
        className={mainPanelClasses}
      >
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          searchTerm={searchTerm}
          setSearchTerm={setSearch}
          searchPosts={searchPosts}
          sortPosts={sortPosts}
          filterPosts={filterPosts}
          clearFilter={clearFilter}
          {...props}
        />
        {getRoute() ? (
          <div id='newsfeed' className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/user" to="/user/newsfeed" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/user" to="/user/newsfeed" />
            </Switch>
          </div>
        )}
        <Footer fluid />
      </div>
    </div>
  );
}
