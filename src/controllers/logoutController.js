const { serverConfig } = require("../config");

const logout = (req, res) => {
    res.clearCookie("token");
    res.render("home", { title: serverConfig.APP_NAME + " - Home" });
  }

  module.exports =logout;
