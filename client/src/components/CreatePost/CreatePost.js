import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");

  const [isRedirect, setIsRedirect] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("files", files[0]);
    data.set("content", content);

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials:'include'
    });

    response.json().then((val) => {
      setIsRedirect(true);
    });
  }

  if (isRedirect) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      ></input>
      <input
        placeholder="summary"
        type="text"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      ></input>
      <input type="file" onChange={(ev) => setFiles(ev.target.files)}></input>
      <ReactQuill
        theme="snow"
        onChange={(val) => setContent(val)}
        value={content}
      ></ReactQuill>
      <button style={{ marginTop: "10px" }}> Create Post</button>
    </form>
  );
};

export default CreatePost;
