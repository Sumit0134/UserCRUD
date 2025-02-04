const express = require("express");

const router = express.Router();

const { createUser, loginUser } = require("../../controllers");

const { isLoggedIn } = require("../../middlewares/authMiddleware");

const { serverConfig } = require("../../config");

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("home", { title: serverConfig.APP_NAME + " - Home" });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("home", { title: serverConfig.APP_NAME + " - Profile" });
});

module.exports = router;
