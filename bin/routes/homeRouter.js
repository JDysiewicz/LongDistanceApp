const { Router } = require("express");
const pool = require("../services/postgresConfig.js");
const router = Router();

// Simple homepage to show people who are linked
router.get("/", (req,res) => {

    // User must be authenticated and have a partner to see this page
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
            <form method="POST" action="/api/logout">
                <input type="submit" value="Logout" />
            </form>

            <form method="POST" action="/api/departner">
                <input type="submit" value="De-Partner" />
            </form>
        `);
        }
    )
});

module.exports = router;