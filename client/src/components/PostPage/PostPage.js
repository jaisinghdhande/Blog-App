import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./PostPage.css";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../../Provider/UserContext";
const PostPage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const { userInfo } = useContext(UserContext);
  console.log("context", userInfo);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((res) => {
      res.json().then((val) => {
        console.log("this is val", val);
        setInfo(val);
      });
    });
  }, []);

  //to render html from a sting

  if (!info) return <h1>Nothing to show!</h1>;
  //   console.log()
  //   const {username}=info.author
  return (
    <div className="blog-page">
      <div className="blog-image">
        <img src={`http://localhost:4000/${info.cover}`} alt="image" />
      </div>
      <div className="author">
        {info.author && <p>by @{info.author.username}</p>}
        <time>{formatISO9075(Date(info.createdAt))}</time>
      </div>
      {userInfo?.id === info.author?._id && (
        <Link to={`/edit/${info._id}`}>Edit this post</Link>
      )}
      <h1>{info.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: info.content }}></div>
    </div>
  );
};

export default PostPage;
