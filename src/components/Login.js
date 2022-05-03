import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login(props) {
  // const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);

  let navigate = useNavigate();

  // const renderErrorMessage = (name) =>
  //   name === errorMessages.name && (
  //     <div className="error">{errorMessages.message}</div>
  //   );

  const handleSubmit = (event) => {
    event.preventDefault();
    let { username, password } = document.forms[0];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      mode: "cors",
    };

    fetch(
      "https://mysterious-ocean-42221.herokuapp.com/admin/login",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.message) {
          console.log(response.message);
        } else {
          props.logUser(response.user);
          localStorage.setItem("savedToken", response.accessToken.token);
          navigate("/blogposts");
        }
        // localStorage.setItem("savedToken", response.accessToken.token);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="Login">
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button>Log In</button>
    </form>
  );
}

export default Login;
