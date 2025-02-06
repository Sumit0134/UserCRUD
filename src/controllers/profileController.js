const { StatusCodes } = require("http-status-codes");

const profile = async (req, res) => {
    try {
      if (!req.user) {
        req.flash("error", "You are not logged in");
        return res.status(401).redirect("/");
      }
  
      res.render("profile", {
        title: "User CRUD - Profile",
        user: req.user,
      });
    } catch (error) {
      req.flash("error", "Something went wrong");
      res.status(500).redirect("/");
    }
  }

  module.exports = 
  profile;