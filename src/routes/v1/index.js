const express = require("express");

const router = express.Router();

const { createUser, loginUser } = require("../../controllers");

const { serverConfig } = require("../../config");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("home", { title: serverConfig.APP_NAME + " - Home" });
});

module.exports = router;
