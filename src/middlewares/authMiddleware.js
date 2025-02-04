const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
  }

  let token = req.cookies.token;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = decodedToken;
  next();
};

module.exports = {
  isLoggedIn,
};
