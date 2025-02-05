const express = require("express");

const router = express.Router();

const { StatusCodes } = require("http-status-codes");

const { mongoose } = require("mongoose");

const { userModel, postModel } = require("../../models");

const { createUser, loginUser, createPost } = require("../../controllers");

const isLoggedIn = require("../../middlewares/authMiddleware");

const { serverConfig } = require("../../config");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("home", { title: serverConfig.APP_NAME + " - Home" });
});

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).redirect("/");
    }

    res.render("profile", {
      title: "User CRUD - Profile",
      user: req.user,
    });
  } catch (error) {
    res.status(500).redirect("/");
  }
});

router.post("/createPost", isLoggedIn, createPost);

router.get("/like/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel
      .findById({ _id: req.params.id })
      .populate("user");
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).redirect("/api/v1/profile");
    }

    let userId = new mongoose.Types.ObjectId(req.user.id);

    if (post.likes.indexOf(userId) === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(post.likes.indexOf(req.user.id), 1);
    }

    await post.save();

    return res.status(StatusCodes.OK).redirect("/api/v1/profile");
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
});

router.get("/editPost/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel
      .findById({ _id: req.params.id })
      .populate("user");
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).redirect("/api/v1/profile");
    }

    res.render("edit", { title: serverConfig.APP_NAME + " - Edit Post", post });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
});

router.post("/updatePost/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel
      .findById({ _id: req.params.id })
      .populate("user");
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).redirect("/api/v1/profile");
    }

    post.content = req.body.content;
    await post.save();
    return res.status(StatusCodes.OK).redirect("/api/v1/profile");
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
});

router.get("/deletePost/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel
      .findById({ _id: req.params.id })
      .populate("user");
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).redirect("/api/v1/profile");
    }

    await post.deleteOne();
    return res.status(StatusCodes.OK).redirect("/api/v1/profile");
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
});

module.exports = router;
