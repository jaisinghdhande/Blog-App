import React, { useState } from "react";
import "./Register.css";
const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok === false) {
      alert("Fuck you");
    }
  }

  return (
    <form onSubmit={register}>
      <h1>Register</h1>
      <input placeholder="Email" onChange={handleUserNameChange}></input>
      <input placeholder="Password" onChange={handlePasswordChange}></input>
      <button>Submit</button>
    </form>
  );
};

export default Register;
