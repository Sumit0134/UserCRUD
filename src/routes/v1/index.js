const express = require("express");

const router = express.Router();

const { StatusCodes } = require("http-status-codes");

const userModel = require("../../models/userModel");

const { createUser, loginUser, createPost } = require("../../controllers");

const { isLoggedIn } = require("../../middlewares/authMiddleware");

const { serverConfig } = require("../../config");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("home", { title: serverConfig.APP_NAME + " - Home" });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findById(req.user.id).populate("post");

  res.render("profile", { title: serverConfig.APP_NAME + " - Profile", user });
});

router.post("/createPost", isLoggedIn, createPost);

module.exports = router;
