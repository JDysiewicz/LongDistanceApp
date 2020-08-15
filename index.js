// Production vs Development env - perhaps a better way to do this
const env = process.env.NODE_ENV || "development";
let keys;
if(env === "development"){
    keys = require("./secrets/keys.js")
} else {
    keys = process.env;
};

const path = require("path");


// Create express app
const express = require("express");
const app = express();


// CORS stuff
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// Passport/Cookie Session setup
const passport = require("passport");
require("./bin/services/passport.js");
const cookieSession = require("cookie-session");
app.use(cookieSession({
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


// Routers
const authRouter = require("./bin/routes/authRouter.js");
const userApiRouter = require("./bin/routes/userApiRouter.js");
const messagesApiRouter = require("./bin/routes/messagesApiRouter.js");


// Use each router
app.use("/auth/google", authRouter);
app.use("/api", userApiRouter);
app.use("/api/messages", messagesApiRouter);


// For Production
if(env !== "development"){
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"))
    });
};


module.exports = app;