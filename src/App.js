import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Index from "./components/Index";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";
import Users from "./components/users/Users";
import Roles from "./components/roles/Roles";
import AddPost from "./components/add-post/AddPost";
import AllPosts from "./components/all-posts/AllPosts";
import PostDetails from "./components/post-details/PostDetails";
import { UserContext, userContextValues } from "./context/userContext";
import { ArticleContext, articleContextValues } from "./context/articleContext";
import { NotificationProvider } from './context/NotificationContext'
import Notification from "./components/notification/Notification";
import { AuthContext, authValues } from './context/authContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import PageNotFound from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <AuthContext.Provider value={authValues}>
    <ArticleContext.Provider value={articleContextValues}>
      <UserContext.Provider value={userContextValues}>
        <NotificationProvider>
        <div className="App">
          <Index />
          <Notification/>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/all" element={<AllPosts />} />
          
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/roles" element={<Roles />} />
              <Route path="/post/add" element={<AddPost />} />
              <Route path="/post/:articleId/details" element={<PostDetails />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        </NotificationProvider>
      </UserContext.Provider>
    </ArticleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
