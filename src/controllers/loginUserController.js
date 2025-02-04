const userModel = require("../models/userModel");

const { StatusCodes } = require("http-status-codes");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: "Please enter all the required fields",
        data: {},
        error: {},
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Account does not exist, please create an account",
        data: {},
        error: {},
      });
    }

    const isPasswordCorrect = brcypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Incorrect password",
        data: {},
        error: {},
      });
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

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      data: {
        user,
      },
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      data: {},
      error: error.message,
    });
  }
};

module.exports = loginUser;
