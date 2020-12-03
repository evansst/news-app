import { DynamicFeed, Bookmark, PostAdd, Person, PersonAdd, LibraryBooks } from "@material-ui/icons";
import FavoritesPage from "views/FavoritesPage";
import HomePage from "views/HomePage"
import LoginPage from "views/LoginPage"
import NewPostPage from "views/NewPostPage";
import RegisterPage from "views/RegisterPage"
import YourPostsPage from "views/YourPostsPage";


const dashRoutes = [
  {
    path: "/newsfeed",
    name: "News Feed",
    icon: DynamicFeed,
    component: HomePage,
    layout: "/user",
    sidebar: true,
  },{
    path: "/favorites",
    name: "Saved Posts",
    icon: Bookmark,
    component: FavoritesPage,
    layout: "/user",
    sidebar: true,
  },{
    path: "/posts",
    name: "Your Posts",
    icon: LibraryBooks,
    component: YourPostsPage,
    layout: "/user",
    sidebar: true,
  },{
    path: "/new_post",
    name: "New Post",
    icon: PostAdd,
    component: NewPostPage,
    layout: "/user",
    sidebar: true,
  },{
    path: "/login",
    name: "Log In",
    icon: Person,
    component: LoginPage,
    layout: "/auth",
    sidebar: false,
  },{
    path: "/register",
    name: "Register",
    icon: PersonAdd,
    component: RegisterPage,
    layout: "/auth",
    sidebar: false,
  }
]

export default dashRoutes;