const { userModel, postModel } = require("../models");

const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  let { name, userName, email, password, age } = req.body;

  name = name.trim();
  if (userName && typeof userName === "string") {
    userName = userName.trim();
  }
  email = email.trim().toLowerCase();
  password = password.trim();

  if (!name || !userName || !email || !password) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).redirect("/");
  }

  let existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).redirect("/");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await userModel.create({
      name,
      userName,
      email,
      password: hashedPassword,
      age,
    });

    let token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(StatusCodes.CREATED).render("profile", {
      title: process.env.APP_NAME + " - Profile",
      user: newUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
  }
};

module.exports = createUser;
