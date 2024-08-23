const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const UserModel = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const PostModel = require("./model/post");
const secret = "Jai3@9604";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
  res.json("Test:Ok");
});

app.post("/register", async (req, res) => {
  try {
    const user = await UserModel.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.json(user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

app.post("/login", async (req, res) => {
  let isOk;
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    console.log(password);
    console.log(user.password);
    isOk = bcrypt.compareSync(password, user.password);
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) {
        return res.status(400).send({ error: err });
      }
      res
        .cookie("token", token, { httpOnly: true })
        .json({ id: user._id, username: username });
    });
  } else {
    res.status(400).send("Invalid");
  }
  // res.send({ ...user, isOk: isOk });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw Error;
    res.json(info);
  });
});

app.post("/post", upload.single("files"), async (req, res) => {
  const { originalname, path } = req.file;
  const { title, summary, content } = req.body;
  const { token } = req.cookies;

  console.log(req.file);
  const parts = originalname.split(".");
  console.log(parts);
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw Error;
    const normalizedPath = newPath.replace(/\\/g, "/");
    const post = await PostModel.create({
      title,
      summary,
      cover: normalizedPath,
      content,
      author: info.id,
    });
    res.status(201).send(post);
    // res.json(info);
  });
});

mongoose.connect("mongodb://127.0.0.1:27017/blog-db").then(() => {
  app.listen(4000);
  console.log("connected to db");
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const post = await PostModel.findById(id).populate("author", ["username"]);

  res.status(200).send(post);
});

app.get("/post", async (req, res) => {
  const post = await PostModel.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.status(200).send(post);
});
