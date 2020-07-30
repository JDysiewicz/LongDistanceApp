const { Router } = require("express");
const pool = require("../services/postgresConfig.js");
const router = Router();

router.get("/", (req,res) => {
    if (!req.isAuthenticated()) return res.send("Please Login");
    if (req.user.has_partner == null) return res.send("Need partner");

    pool.query(
        `SELECT * FROM users WHERE partner_code=$1`,
        [req.user.has_partner],
        (err, results) => {
            if(err) return console.error(err);
            const partnerName = results.rows[0].given_name;
            res.send(`
            <span>HomePage for ${req.user.given_name} and ${partnerName}</span>
            <form action="/api/logout">
                <input type="submit" value="Logout" />
            </form>
        `);
        }
    )
});

module.exports = router;