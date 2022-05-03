import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NewPost(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const [blogpost, setBlogpost] = useState(
    location.state ? location.state.bp : { title: "", blogPost: "" }
  );
  // console.log(location.state.bp);
  console.log(blogpost);

  const handleSubmit = (event) => {
    event.preventDefault();
    let { title, blogPost } = document.forms[0];
    let requestOptions;
    let fetchUrl;
    if (location.state) {
      requestOptions = {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("savedToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          blogPost: blogPost.value,
        }),
        mode: "cors",
      };
      fetchUrl =
        "https://mysterious-ocean-42221.herokuapp.com/blogPosts/" +
        blogpost._id +
        "/edit";
    } else {
      requestOptions = {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("savedToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          blogPost: blogPost.value,
        }),
        mode: "cors",
      };
      fetchUrl =
        "https://mysterious-ocean-42221.herokuapp.com/blogPosts/create";
    }

    fetch(fetchUrl, requestOptions)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.message) {
          console.log(response.message);
        } else {
          // console.log(response);
          navigate("/blogposts");
        }
        // localStorage.setItem("savedToken", response.accessToken.token);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="Login">
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={blogpost.title}
          onChange={(e) => {
            setBlogpost({ ...blogpost, title: e.target.value });
          }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="blogPost">Blog Post</label>
        <textarea
          rows="20"
          cols="145"
          id="blogPost"
          name="blogPost"
          value={blogpost.blogPost}
          onChange={(e) => {
            setBlogpost({ ...blogpost, blogPost: e.target.value });
          }}
        />
      </div>
      <button>{location.state ? "update" : "create"}</button>
    </form>
  );
}

export default NewPost;
