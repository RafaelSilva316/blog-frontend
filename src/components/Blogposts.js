import React, { useEffect, useState } from "react";
import "../styles/Blogposts.css";
import { useNavigate } from "react-router-dom";

function Blogposts(props) {
  let navigate = useNavigate();

  const [blogposts, setBlogposts] = useState([]);
  useEffect(() => {
    fetch("https://mysterious-ocean-42221.herokuapp.com/blogPosts", {
      mode: "cors",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setBlogposts([...response]);
      });
  }, []);

  const deletePost = (e, bp) => {
    e.stopPropagation();
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("savedToken"),
        "Content-Type": "application/json",
      },
      mode: "cors",
    };
    const fetchUrl =
      "https://mysterious-ocean-42221.herokuapp.com/blogPosts/" +
      bp._id +
      "/delete";
    fetch(fetchUrl, requestOptions).then(function (response) {
      let newPostList = blogposts;
      let newestPostList = newPostList.filter((listPost) => {
        return listPost._id !== bp._id;
      });
      setBlogposts(newestPostList);
    });
  };

  const updatePost = (e, bp) => {
    e.stopPropagation();
    navigate("/updatePost", { state: { bp: bp } });
  };

  const goToPost = (postId) => {
    navigate("/blogpost", { state: { blogId: postId } });
  };

  return (
    <div className="Blog">
      <h1>All Blog Posts</h1>
      <ul className="Blogposts">
        {blogposts.map((blogpost, index) => {
          return (
            <li
              onClick={() => {
                goToPost(blogpost._id);
              }}
              key={index}
              className="blog-card blog-click"
            >
              <p className="title">{blogpost.title}</p>
              <p className="text">{blogpost.blogPost}</p>
              {props.user !== "" ? (
                <div className="edit-btns-box">
                  <button
                    onClick={(e) => {
                      deletePost(e, blogpost);
                    }}
                    className="btn btn-del"
                  >
                    delete
                  </button>
                  <button
                    onClick={(e) => {
                      updatePost(e, blogpost);
                    }}
                    className="btn btn-update"
                  >
                    update
                  </button>
                </div>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Blogposts;
