import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Provider/UserContext";
import "./header.css";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUserInfo(null);
    });
  }
  const userName = userInfo?.username;

  return (
    <nav>
      <Link to="/" className="logo">
        My blog
      </Link>
      <div className="nav-options">
        {userName && (
          <>
            <p>Welcome, {userName}</p>
            <Link to="/post">Create+</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
