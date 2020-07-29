const express = require("express");
const mongoose = require("mongoose");
const keys = require("./secrets/keys.js");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User.js");
require("./bin/services/passport.js");

mongoose.connect(keys.mongoURI)


const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./bin/routes/authRouter.js");
const userApiRouter = require("./bin/routes/userApiRouter.js");

app.get("/", (req,res) => {
    res.send("test");
});

app.use("/auth/google", authRouter);
app.use("/api", userApiRouter);

module.exports = app;