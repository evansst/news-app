const { DynamicFeed, Bookmark, PostAdd } = require("@material-ui/icons");
const { default: HomePage } = require("./views/HomePage");

const dashRoutes = [
  {
    path: "/newsfeed",
    name: "NewsFeed",
    icon: DynamicFeed,
    component: HomePage,
    layout: '/user'
  },{
    path: "/favorites",
    name: "Favorites",
    icon: Bookmark,
    component: null,
    layout: '/user'
  },{
    path: "/post",
    name: "Post Content",
    icon: PostAdd,
    component: null,
    layout: '/user'
  }
]

export default dashRoutes;