const passport = require("passport");
const keys = process.env || require("../../secrets/keys.js");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = mongoose.model("user");

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id});

    if (existingUser){
        console.log("User in DB")
        return done(null, existingUser);
    };

    const newUser = await new User({
        googleId: profile.id,
        familyName: profile.name.familyName,
        givenName: profile.name.givenName
    }).save();

    console.log("User created");
    return done(null, newUser);
})
);