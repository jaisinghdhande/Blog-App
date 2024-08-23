import React, { useContext, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Provider/UserContext";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function register(e) {
    e.preventDefault();
    let body = {
      username: username,
      password: password,
    };

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log(response);

    if (response.ok === false) {
      alert("Login Failed");
    }
    if (response.ok) {
      response.json().then((res) => {
        setUserInfo(res);
        navigate("/");
      });
    }
  }

  return (
    <form onSubmit={register}>
      <h1>Login</h1>
      <input placeholder="Email" onChange={handleUserNameChange}></input>
      <input placeholder="Password" onChange={handlePasswordChange}></input>
      <button>Submit</button>
    </form>
  );
};

export default Login;
