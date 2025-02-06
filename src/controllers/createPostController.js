const { userModel, postModel } = require("../models");

const { StatusCodes } = require("http-status-codes");

const createPost = async (req, res) => {
  try {
    let { content } = req.body;
    if (!content) {
      req.flash("error", "All fields are required");
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .redirect("/api/v1/profile");
    }

    if (!req.user || !req.user.id) {
      req.flash("error", "You are not logged in");
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    let user = await userModel.findById(req.user.id);
    if (!user) {
      req.flash("error", "You are not logged in");
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    let newPost = await postModel.create({
      user: req.user.id,
      content,
      likes: [],
    });

    user.posts.push(newPost._id);
    await user.save();

    req.flash("success", "Post created successfully");
    return res.status(StatusCodes.CREATED).redirect("/api/v1/profile");
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
};

module.exports = createPost;
