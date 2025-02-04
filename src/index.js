const express = require("express");

const app = express();

const path = require("path");

const colors = require("colors");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const { serverConfig, databaseConfig } = require("./config");

databaseConfig();

const apiRoutes = require("./routes");

app.get("/", (req, res) => {
  res.render("home", { title: serverConfig.APP_NAME + " - Home" });
});

app.use("/api", apiRoutes); 

app.listen(serverConfig.PORT, () => {
  console.log(
    `${serverConfig.APP_NAME}`.green +
      ` is running on port: `.yellow +
      `${serverConfig.PORT}`.cyan
  );
});
