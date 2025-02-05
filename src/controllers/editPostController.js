const { StatusCodes } = require("http-status-codes");

const postModel = require("../models/postModel");

const { serverConfig } = require("../config");

const editPost = async (req, res) => {
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
};

module.exports = editPost;
