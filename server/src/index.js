const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const postRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
  res.json("Test:Ok");
});

app.use("/post", postRoute);
app.use("/user", userRoute);

// app.post("/post", upload.single("files"), async (req, res) => {
//   const { originalname, path } = req.file;
//   const { title, summary, content } = req.body;
//   const { token } = req.cookies;

//   console.log(req.file);
//   const parts = originalname.split(".");
//   console.log(parts);
//   const ext = parts[parts.length - 1];
//   const newPath = path + "." + ext;
//   fs.renameSync(path, newPath);

//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) throw Error;
//     const normalizedPath = newPath.replace(/\\/g, "/");
//     const post = await PostModel.create({
//       title,
//       summary,
//       cover: normalizedPath,
//       content,
//       author: info.id,
//     });
//     res.status(201).send(post);
//     // res.json(info);
//   });
// });

mongoose.connect("mongodb://127.0.0.1:27017/blog-db").then(() => {
  app.listen(4000);
  console.log("connected to db");
});
