
const env = process.env.NODE_ENV || "development";
let keys;
if(env === "development"){
    keys = require("./secrets/keys.js")
} else {
    keys = process.env;
};

const express = require("express");
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
        res.send(
            `<span>Please Login:</span>
            <form action="/auth/google">
                <input type="submit" value="Login with Google" />
            </form>`
        );
    } else {
        const user = req.user;
        res.send(
            `<span>Welcome ${user.given_name}, your partner code is ${user.partner_code}!</span>
            <form action="/api/logout">
                <input type="submit" value="Logout" />
            </form>`
            );
    };
});

app.use("/auth/google", authRouter);
app.use("/api", userApiRouter);

module.exports = app;