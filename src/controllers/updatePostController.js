const postModel = require("../models/postModel");

const { StatusCodes } = require("http-status-codes");

const updatePost = async (req, res) => {
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
  }

  module.exports = updatePost;