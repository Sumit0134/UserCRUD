const userModel = require("../models/userModel");

const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).redirect("/");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(StatusCodes.OK).render("profile", {
      title: "User CRUD - Profile",
      user,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
  }
};

module.exports = loginUser;
