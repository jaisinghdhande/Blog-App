const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
  res.json("Test:Ok");
});

app.use("/blog", blogRoute);
app.use("/user", userRoute);

mongoose.connect("mongodb://127.0.0.1:27017/blog-db").then(() => {
  app.listen(4000);
  console.log("connected to db");
});
