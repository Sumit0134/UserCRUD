const expressSession = require("express-session");

const mongoStore = require("connect-mongo");

module.exports = expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    store: mongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
    }),
});