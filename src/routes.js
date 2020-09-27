import { DynamicFeed, Bookmark, PostAdd, Person, PersonAdd } from "@material-ui/icons";
import HomePage from "views/HomePage"
import LoginPage from "views/LoginPage"
import RegisterPage from "views/RegisterPage"


const dashRoutes = [
  {
    path: "/newsfeed",
    name: "NewsFeed",
    icon: DynamicFeed,
    component: HomePage,
    layout: "/user",
  },{
    path: "/favorites",
    name: "Favorites",
    icon: Bookmark,
    component: null,
    layout: "/user",
  },{
    path: "/post",
    name: "Post Content",
    icon: PostAdd,
    component: null,
    layout: "/user",
  },{
    path: "/login",
    name: "Log In",
    icon: Person,
    component: LoginPage,
    layout: "/auth",
  },{
    path: "/register",
    name: "Register",
    icon: PersonAdd,
    component: RegisterPage,
    layout: "/auth"
  }
]

export default dashRoutes;