const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const BlogModel = require("../model/blog");

module.exports.getBlog = async (req, res) => {
  const post = await BlogModel.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.status(200).send(post);
};

module.exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  const post = await BlogModel.findById(id).populate("author", ["username"]);

  res.status(200).send(post);
};

module.exports.createBlog = async (req, res) => {
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
    const post = await BlogModel.create({
      title,
      summary,
      cover: normalizedPath,
      content,
      author: info.id,
    });
    res.status(201).send(post);
    // res.json(info);
  });
};
