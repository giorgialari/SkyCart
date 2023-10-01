const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.login = async (req, res, next) => {
  try {
    const user = await userModel.findUserByUsername(req.body.username);
    if (!user) {
      const error = new Error();
      error.type = "authentication.failed";
      return next(error);
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      const error = new Error();
      error.type = "authentication.failed";
      return next(error);
    }
    const SECRET_KEY = process.env.JWT_SECRET;

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (e) {
    return next(e);
  }
};

exports.createUser = async (req, res, next) => {
  //verifico che non ci sia già un utente con lo stesso username
  const user = await userModel.findUserByUsername(req.body.username);
  if (user) {
    const error = new Error();
    error.type = "existing.user";
    return next(error);
  }
  try {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const result = await userModel.createUser(username, password, name);
    res.status(201).json({ message: "User created", userId: result.insertId });
  } catch (e) {
    return next(e);
  }
};
