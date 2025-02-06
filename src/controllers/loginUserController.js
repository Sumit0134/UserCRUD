const { StatusCodes } = require("http-status-codes");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "All fields are required");
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).redirect("/");
    }

    const user = await userModel.findOne({ email }).populate("posts");
    if (!user) {
      req.flash("error", "User not found");
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      req.flash("error", "Invalid credentials");
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
    req.flash("error", "Something went wrong");
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
  }
};

module.exports = loginUser;
