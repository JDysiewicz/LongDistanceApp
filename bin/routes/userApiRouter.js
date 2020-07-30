const { Router } = require("express");
const pool = require("../services/postgresConfig.js");
const router = Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get("/current_user", (req,res) => {
    res.send(req.user);
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.post("/send-request", urlencodedParser, (req,res) => {
    const partnersCode = req.body.partnerscode.toString().split("").join("-");
    const thisUserCode = req.user.partner_code;
    pool.query(
        `SELECT * FROM users WHERE partner_code=$1`,
        [partnersCode],
        (err, results) => {
            if(err) return console.error(err);
            if(results.rows.length === 0 ) return res.send("No user by that code");
            pool.query(
                `UPDATE users SET has_request=$1 WHERE partner_code=$2 RETURNING *`,
                [thisUserCode, partnersCode],
                (err, results) => {
                    if(err) return console.error(err)
                    console.log("User Updated: ", results.rows[0])

                    pool.query(
                        `UPDATE users SET sent_request=$1 WHERE partner_code=$2 RETURNING *`,
                        [partnersCode, thisUserCode],
                        (err, results) => {
                            if(err) return console.error(err)
                            console.log("User Updated: ", results.rows[0])
                            res.send("Request Sent!")
                        }
                    )
                }
            )
        }
    )

});

router.post("/partner-up", (req,res) => {
    const thisUserCode = req.user.partner_code;
    const partnersCode = req.user.has_request;
    pool.query(
        `INSERT INTO partners(partner1,partner2) VALUES($1,$2) RETURNING *`,
        [thisUserCode,partnersCode],
        (err, results) => {
            if(err) return console.error(err)
            console.log("Partners Added", results.rows[0]);
            pool.query(
                `UPDATE users SET has_partner=$1,sent_request=$2,has_request=$3 WHERE partner_code=$4 RETURNING *`,
                [partnersCode, null, null, thisUserCode],
                (err, results) => {
                    if(err) return console.error(err)
                    console.log("Updated User 1", results.rows[0]);
                    pool.query(
                        `UPDATE users SET has_partner=$1,sent_request=$2,has_request=$3 WHERE partner_code=$4 RETURNING *`,
                        [thisUserCode, null, null, partnersCode],
                        (err, results) => {
                            if(err) return console.error(err)
                            console.log("Updated User 2", results.rows[0]);
                            return res.redirect("/home")
                        }
                    );
                }
            );
        }
    );
});


module.exports = router;