const userModel = require("../models/userModel");
const postModel = require("../models/postModel");

const { StatusCodes } = require("http-status-codes");

const createPost = async (req, res) => {
  try {
    let { content } = req.body;
    if (!content) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .redirect("/api/v1/profile");
    }

    if (!req.user || !req.user.id) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    let user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect("/");
    }

    let newPost = await postModel.create({
      user: req.user.id,
      content,
    });

    user.posts.push(newPost._id);
    await user.save();

    return res.status(StatusCodes.CREATED).redirect("/api/v1/profile");
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .redirect("/api/v1/profile");
  }
};

module.exports = createPost;
