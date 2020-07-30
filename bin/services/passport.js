// Dev vs Prod environment
const env = process.env.NODE_ENV || "development";
let keys;
if(env === "development"){
    keys = require("../../secrets/keys.js")
} else {
    keys = process.env;
};


// Initial imports plus google strategy
const passport = require("passport");
const pool = require("./postgresConfig.js");
const generatePartnerCode = require("../../helper/generatePartnerCode.js");
const GoogleStrategy = require("passport-google-oauth20");


// Use the GoogleStrategy for OAuth
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, async(accessToken, refreshToken, profile, done) => {

    // Checks if user already exists in database - res.rows[0] is the user details
    pool.query(
        `SELECT * FROM users WHERE google_id=$1`,
        [profile.id],
        (err, res) => {
            if (err) return console.error(err);
            if (res.rows.length > 0){
                console.log("Existing User", res.rows);
                done(null, res.rows[0]);
            } else {

                // If not creates new user and generates their partner code
                let partnerCode = generatePartnerCode();
                pool.query(
                    `INSERT INTO users(google_id,family_name,given_name,partner_code) VALUES($1,$2,$3,$4) RETURNING *`,
                    [profile.id, profile.name.familyName, profile.name.givenName, partnerCode],
                    (err, res) => {
                        if (err) return console.error(err);
                        console.log("User Added!", res.rows);
                        done(null,res.rows[0]);
                    }
                );

            }
        }
    );    
})
);


// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});