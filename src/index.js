const express = require("express");

const app = express();

const path = require("path");

const colors = require("colors");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const flash = require("connect-flash");

const postModel = require("./models/postModel");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const { serverConfig, databaseConfig } = require("./config");

databaseConfig();

const sessionConfig = require("./config/session-config");
app.use(sessionConfig);
app.use(flash());

const apiRoutes = require("./routes");

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.get("/", async (req, res) => {
  try {
    const recentPosts = await postModel.find().limit(5).populate("user");

    res.render("home", {
      title: serverConfig.APP_NAME + " - Home",
      recentPosts: recentPosts || [],
    });
  } catch (error) {
    req.flash("error", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect("/");
  }
});

app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, () => {
  console.log(
    `${serverConfig.APP_NAME}`.green +
      ` is running on port: `.yellow +
      `${serverConfig.PORT}`.cyan
  );
});
