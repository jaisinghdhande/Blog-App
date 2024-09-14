const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

module.exports.registerUser = async (req, res) => {
  try {
    const user = await UserModel.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.json(user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

module.exports.loginUser = async (req, res) => {
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
        .json({ id: user._id, username: username, token });
    });
  } else {
    res.status(400).send("Invalid");
  }
};

module.exports.getProfile = (req, res) => {
  res.status(200).json({
    error: false,
    message: req.userInfo,
  });
};

module.exports.logoutUser = (req, res) => {
  res.status(200).cookie("token", "").json({
    error: false,
    message: "Logout Successful",
  });
};
