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

function App() {
  return (
    <ArticleContext.Provider value={articleContextValues}>
      <UserContext.Provider value={userContextValues}>
        <div className="App">
          <Index />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/roles" element={<Roles />} />
            <Route path="/post/add" element={<AddPost />} />
            <Route path="/post/all" element={<AllPosts />} />
            <Route path="/post/:articleId/details" element={<PostDetails />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </ArticleContext.Provider>
  );
}

export default App;
