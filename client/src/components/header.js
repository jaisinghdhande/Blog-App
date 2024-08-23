import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Provider/UserContext";

export default function Header() {
  const { userInfo, setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res
        .json()
        .then((userInfo) => {
          console.log("called",userInfo);
          setUserInfo(userInfo);
        })
       
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUserInfo(null);
    });
  }
  const userName=userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My blog
      </Link>
      <nav>
        {userName && (
          <>
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
      </nav>
    </header>
  );
}
