const express = require("express");

// DEPLOYMENT
const keys = process.env;

// // Dev!
// const keys = require("./secrets/keys.js");


const cookieSession = require("cookie-session");
const passport = require("passport");

require("./bin/services/passport.js");

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [keys.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./bin/routes/authRouter.js");
const userApiRouter = require("./bin/routes/userApiRouter.js");

app.get("/", (req,res) => {
    if(!req.isAuthenticated()){
        res.send("NOT logged in")
    } else {
        const user = req.user;
        res.send(`Welcome ${user.given_name}, your partner code is ${user.partner_code}`);
    };
});

app.use("/auth/google", authRouter);
app.use("/api", userApiRouter);

module.exports = app;