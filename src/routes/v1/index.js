const express = require("express");

const router = express.Router();

const { StatusCodes } = require("http-status-codes");

const { mongoose } = require("mongoose");

const userModel = require("../../models/userModel");
const postModel = require("../../models/postModel");

const {
  createUser,
  loginUser,
  createPost,
  likePost,
  editPost,
  updatePost,
  deletePost,
} = require("../../controllers");

const { isLoggedIn } = require("../../middlewares/authMiddleware");

const { serverConfig } = require("../../config");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("home", { title: serverConfig.APP_NAME + " - Home" });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findById(req.user.id).populate("posts");

  res.render("profile", { title: serverConfig.APP_NAME + " - Profile", user });
});

router.post("/createPost", isLoggedIn, createPost);

router.get("/like/:id", isLoggedIn, likePost);

router.get("/editPost/:id", isLoggedIn, editPost);

router.post("/updatePost/:id", isLoggedIn, updatePost);

router.get("/deletePost/:id", isLoggedIn, deletePost);

module.exports = router;
