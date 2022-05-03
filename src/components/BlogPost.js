import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Blogpost.css";
import { useNavigate } from "react-router-dom";

function BlogPost(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const [blogpost, setBlogpost] = useState({});
  useEffect(() => {
    fetch(
      "https://mysterious-ocean-42221.herokuapp.com/blogPosts/" +
        location.state.blogId,
      {
        mode: "cors",
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        // console.log(response.comments);
        setBlogpost(response);
      });
  }, []);

  const addComment = (event, Blogid) => {
    event.preventDefault();
    let { name, commentPost } = document.forms[0];

    const requestOptions = {
      method: "POST",
      headers: {
        // Authorization: localStorage.getItem("savedToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        commentPost: commentPost.value,
      }),
      mode: "cors",
    };
    fetch(
      "https://mysterious-ocean-42221.herokuapp.com/blogPosts/" +
        Blogid +
        "/comments/create",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.message) {
          console.log(response.message);
        } else {
          let newCommentList = blogpost.comments;
          console.log(response);
          newCommentList.push({
            _id: response._id,
            name: name.value,
            commentPost: commentPost.value,
          });
          setBlogpost({ ...blogpost, comments: newCommentList });
        }
      });
  };

  const deleteComment = (e, comment) => {
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
      blogpost._id +
      "/comments/" +
      comment._id +
      "/delete";
    fetch(fetchUrl, requestOptions).then(function (response) {
      let newCommentList = blogpost.comments;
      let newestArray = newCommentList.filter((listComment) => {
        return listComment._id !== comment._id;
      });
      setBlogpost({ ...blogpost, comments: newestArray });
    });
  };

  return (
    <div className="blog-card">
      <p className="title">{blogpost.title}</p>
      <p className="text">{blogpost.blogPost}</p>

      <ul className="comments">
        <div className="btn-box">
          <form
            onSubmit={(event) => {
              addComment(event, blogpost._id);
            }}
            className="comment-form"
          >
            <div className="form-field">
              <label htmlFor="title">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="form-field">
              <label htmlFor="commentPost">Comment</label>
              <textarea
                rows="4"
                cols="35"
                id="commentPost"
                name="commentPost"
              />
            </div>
            <button className="btn btn-comment">Add comment</button>
          </form>
        </div>
        {blogpost.comments
          ? blogpost.comments.map((comment, index) => {
              return (
                <li key={index} className="comment-card">
                  <p className="comment-name">{comment.name}</p>
                  <p className="comment-post">{comment.commentPost}</p>
                  {props.user !== "" ? (
                    <div>
                      <button
                        onClick={(e) => {
                          deleteComment(e, comment);
                        }}
                        className="btn btn-del"
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default BlogPost;
