import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar(props) {
  let logButton;
  if (props.user !== "") {
    logButton = (
      <>
        <li>
          <NavLink
            to="/blogposts"
            onClick={() => {
              props.logUser("");
              localStorage.clear();
            }}
          >
            Logout
          </NavLink>
        </li>
        <li>
          <NavLink to="/newPost">New Post</NavLink>
        </li>
      </>
    );
  } else {
    logButton = (
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    );
  }
  return (
    <ul className="Navbar">
      <li>
        <NavLink to="/blogposts">All Posts</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      {logButton}
      {/* <li>{localStorage.savedToken}</li> */}
    </ul>
  );
}

export default Navbar;
