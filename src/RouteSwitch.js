import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { useState } from "react";
import About from "./components/About";
import Blogposts from "./components/Blogposts";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";
import BlogPost from "./components/BlogPost";

const RouteSwitch = () => {
  const [user, setUser] = useState("");

  const logUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <BrowserRouter basename={/blog-frontend/}>
      <Navbar user={user} logUser={logUser}></Navbar>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login logUser={logUser} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/updatePost" element={<NewPost />} />
        <Route path="/blogposts" element={<Blogposts user={user} />} />
        <Route path="/blogpost" element={<BlogPost user={user} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouteSwitch;
