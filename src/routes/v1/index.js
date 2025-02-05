const express = require("express");

const router = express.Router();

const { StatusCodes } = require("http-status-codes");

const { mongoose } = require("mongoose");

const { userModel, postModel } = require("../../models");

const {
  createUser,
  loginUser,
  logout,
  profile,
  createPost,
  likePost,
  editPost,
  updatePost,
  deletePost,
  uploadImage,
  uploadProfile,
} = require("../../controllers");

const isLoggedIn = require("../../middlewares/authMiddleware");

const { serverConfig } = require("../../config");

const upload = require("../../config/multer-config");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/logout", logout);

router.get("/profile", isLoggedIn, profile);

router.post("/createPost", isLoggedIn, createPost);

router.get("/like/:id", isLoggedIn, likePost);

router.get("/editPost/:id", isLoggedIn, editPost);

router.post("/updatePost/:id", isLoggedIn, updatePost);

router.get("/deletePost/:id", isLoggedIn, deletePost);

router.get("/uploadImage", isLoggedIn, uploadImage);

router.post(
  "/uploadProfile",
  isLoggedIn,
  upload.single("image"),
  uploadProfile
);

module.exports = router;
