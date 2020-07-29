const { Router } = require("express");
const router = Router();


router.get("/", (req,res) => {
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


module.exports = router;