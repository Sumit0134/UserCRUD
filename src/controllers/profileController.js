const { StatusCodes } = require("http-status-codes");

const profile = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).redirect("/");
      }
  
      res.render("profile", {
        title: "User CRUD - Profile",
        user: req.user,
      });
    } catch (error) {
      res.status(500).redirect("/");
    }
  }

  module.exports = 
  profile;