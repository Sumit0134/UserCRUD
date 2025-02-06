const { StatusCodes } = require("http-status-codes");

const { mongoose } = require("mongoose");

const postModel = require("../models/postModel");

const likePost = async (req, res) => {
  try {
    let post = await postModel
      .findById({ _id: req.params.id })
      .populate("user");
    if (!post) {
      req.flash("error", "Post not found");
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
    req.flash("error", "Something went wrong");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
};

module.exports = likePost;
