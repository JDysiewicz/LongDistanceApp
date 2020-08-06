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
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());


// Routers
const authRouter = require("./bin/routes/authRouter.js");
const userApiRouter = require("./bin/routes/userApiRouter.js");
const indexRouter = require("./bin/routes/indexRouter.js");
const homeRouter = require("./bin/routes/homeRouter.js");
const messagesApiRouter = require("./bin/routes/messagesApiRotuer.js");


// Use each router
app.use("/auth/google", authRouter);
app.use("/api", userApiRouter);
app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/api/messages", messagesApiRouter);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  });
  
module.exports = app;