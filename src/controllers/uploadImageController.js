const { serverConfig } = require("../config");

const uploadImage = async (req, res) => {
    res.render("upload", { title: serverConfig.APP_NAME + " - Upload Image" });
  }

  module.exports = uploadImage;