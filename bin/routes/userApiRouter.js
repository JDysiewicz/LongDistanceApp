const { Router } = require("express");
const router = Router();

router.use("/current_user", (req,res) => {
    res.send(req.user);
});



router.use("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;