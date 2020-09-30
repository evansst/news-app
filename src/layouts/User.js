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


// var ps;

const useStyles = makeStyles(styles);

export default function UserLayout(props) {
  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const [logo] = useState(require("assets/img/logo-white (1).png"));
  const [allPosts, setAllPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [postCount, setPostCount] = useState(null)

  const setSearch = (value) => {
    setSearchTerm(value)
  }

  const searchPosts = () => {
    if(searchTerm){
      const filteredPosts = allPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.category.toLowerCase().includes(searchTerm))
        )
      })
      filteredPosts.length ? setPostCount('success') : setPostCount('failure')
      setPosts(filteredPosts)
    } else {
      setPosts(allPosts)
    }
    setPostCount(posts.count)
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

  useEffect(() => {

    //fetch all the posts
    fetch(postsURL)
      .then(parseJSON)
      .then(posts => {
        setPosts(posts)
        setPostCount(posts.count)
        setAllPosts(posts)
      })
  
    // Specify how to clean up after this effect:
    return function cleanup() {

    };
  }, []);
  // functions for changeing the states from components

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = routes => {
    let activeRoute = "The Inside Scoop";
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
                postCount={postCount}
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
        logoText={"The Inside Scoop"}
        logo={logo}
        // image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"red"}
        bgColor={"black"}
        miniActive={miniActive}
        {...rest}
      />
      <div
        id="main-panel"
        className={mainPanelClasses}
        // ref={mainPanel}
      >
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          searchTerm={searchTerm}
          setSearchTerm={setSearch}
          searchPosts={searchPosts}
          postCount={postCount}
          {...rest}
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
