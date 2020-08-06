# OAuth - Completed 30/07/2020
- STEPS:
1) Get server up and running.
2) Get google strategy from passport (all in passport.js file).

```
const GoogleStrategy = require("passport-google-oauth20");
```

3) implement strategy, providing ID, secret, and callback.

```
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
}, async(accessToken, refreshToken, profile, done) => {
```

4) Persist to database using postgres/mongo etc,; call done(null, <USER_OBJECT>) when done.

5) Serialize and Deserialize user.

```
// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});
```

6) Over in the index.js file, implement cookieSession to enable sessions

```
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./bin/services/passport.js");

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: [keys.cookieKey]
}));
```

7) Initialize passport to use and track sessions.

```
app.use(passport.initialize());
app.use(passport.session());
```

8) auth routes for authentication and the callback - getting authenticated takes two arguments in the passport.authenticate("google") part - also takes the scope. Callback URL takes a res,req instead of the scope.

```
router.get("/",
    passport.authenticate("google",
    {scope: ["profile", "email"]}
    )
);

router.get(
    "/callback",
    passport.authenticate("google"),
    (req,res) => {
        res.redirect("/");
    }
);
```

9) Now user info is stored in the req.user element.

```
router.use("/current_user", (req,res) => {
    res.send(req.user);
});
```

10) Can use `req.isAuthenticated()` to see if authenticated - returns true if they are and false if not.

## Misc
- Production vs Development keys via:

```
const env = process.env.NODE_ENV || "development";
let keys;
if(env === "development"){
    keys = require("../../secrets/keys.js")
} else {
    keys = process.env;
};
```

## Struggles
- Originally started with MongoDB - had to refactor it to involve postgres instead as the data would be better suited to relational means. This was hard because I originally learned it all via MongoDB and it has a unique `user.id` property when using a Model class of User. Could also assign `User.findOne()` to a variable. When doing this with a `pool.query` it didn't work, so I had to figure out how to pass information from the queries to `done`, then on to `seralizeUser`/`deserializeUser`, then on to the `req.user` object. This also involved learning what the cookies actually did and how they were stored. This gave me a better understanding of how session storage works via cookies - still not too sure on how the encryption with the `cookieKey` works though.

## Front end stuff
- Hooking up backend and front end was harder than expected - was originally rendering HTMl with the backend so it was easy to do database calls and such within that before rendering it.
- Had to use react router to sort out the routing, and using the backend as purely an API
- Getting info from calling the API when logged in - prehaps some secutrity concerns here and perhaps needs to be cleaned up (e.g all the `res.send()` stuff in the indexRouter/userRouter stuff )
- A lot of react stuff learned from Stephen Grider's course - no redux or hooks right now but I can always refactor after I've been through those sections in the course.
- My css is so bad lmao - had to relook up everything
- MOCK UPS ARE SO USEFUL! Give a really good idea of what to do first
    - It's 100% worth it to spend 2 days doing zero coding to get a clear idea, then code, rather than just jumping right into it
    - For front end at least - probably a similar plan for backend - workflow perhaps rather than drawing a mockup?
