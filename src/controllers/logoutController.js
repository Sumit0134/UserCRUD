const { serverConfig } = require("../config");

const postModel = require("../models/postModel");

const logout = async (req, res) => {
    res.clearCookie("token");

    const recentPosts=await postModel.find().limit(5).populate("user");

    res.render("home", { title: serverConfig.APP_NAME + " - Home", recentPosts});
  }

  module.exports =logout;
