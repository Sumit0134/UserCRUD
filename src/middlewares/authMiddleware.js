const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    let token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    const user = await userModel.findById(decodedToken.id).populate("posts");

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
  }
};

module.exports = isLoggedIn;
