const { StatusCodes } = require("http-status-codes");

const userModel = require("../models/userModel");

const uploadProfile = async (req, res) => {
    try {
      let user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).redirect("/api/v1/profile");
      }
  
      if (!user.image) {
        user.image = {}; 
      }
  
      if (req.file) {
        user.image.data = req.file.buffer; 
        user.image.contentType = req.file.mimetype; 
      }
  
      await user.save();
      return res.status(StatusCodes.OK).redirect("/api/v1/profile");
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .redirect("/api/v1/profile");
    }
  }

  module.exports = uploadProfile;