const { Router } = require("express");
const router = Router();
const passport = require("passport");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false})

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


module.exports = router;
