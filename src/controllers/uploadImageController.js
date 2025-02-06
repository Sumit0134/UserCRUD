const { serverConfig } = require("../config");

const uploadImage = async (req, res) => {
  if (!req.file) {
    req.flash("error", "No file uploaded");
    return res.status(StatusCodes.BAD_REQUEST).redirect("/api/v1/profile");
  }

  if (req.file.mimetype !== "image/jpeg" && req.file.mimetype !== "image/png") {
    req.flash("error", "Invalid file type");
    return res.status(StatusCodes.BAD_REQUEST).redirect("/api/v1/profile");
  }

    res.render("upload", { title: serverConfig.APP_NAME + " - Upload Image" });
  }

  module.exports = uploadImage;