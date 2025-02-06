const postModel = require("../models/postModel");

const { StatusCodes } = require("http-status-codes");

const deletePost = async (req, res) => {
    try {
      let post = await postModel
        .findById({ _id: req.params.id })
        .populate("user");
      if (!post) {
        req.flash("error", "Post not found");
        return res.status(StatusCodes.NOT_FOUND).redirect("/api/v1/profile");
      }
  
      await post.deleteOne();
  
      req.flash("success", "Post deleted successfully");
      return res.status(StatusCodes.OK).redirect("/api/v1/profile");
    } catch (error) {
      req.flash("error", "Something went wrong");
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .redirect("/api/v1/profile");
    }
  }

  module.exports = deletePost;