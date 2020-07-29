const { Router } = require("express");
const router = Router();
const passport = require("passport");


router.get("/",
    passport.authenticate("google",
    {scope: ["profile", "email"]}
    )
);

router.get(
    "/callback",
    passport.authenticate("google", {successRedirect: "/api/current_user", failureRedirect: "/"})  
);

module.exports = router;
