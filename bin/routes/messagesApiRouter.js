const { Router } = require("express");
const pool = require("../services/postgresConfig.js");
const router = Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.get("/", (req,res) => {
    const partnersCode = req.user.has_partner;
    const thisUserCode = req.user.partner_code;
    pool.query(
        `SELECT * FROM messages
        WHERE (sender_partner_code = $1 AND recipient_partner_code = $2)
        OR (sender_partner_code = $2 AND recipient_partner_code = $1)
        ORDER BY time_sent`,
        [partnersCode, thisUserCode],
        (err, results) => {
            if(err) console.error(err);
            res.send(results.rows);
        }
    )
});

router.post("/" , urlencodedParser, (req,res) => {
    const partnersCode = req.user.has_partner;
    const thisUserCode = req.user.partner_code;
    const message = req.query.message;
    pool.query(
        `INSERT INTO messages(message, sender_partner_code, recipient_partner_code) VALUES($1,$2,$3) RETURNING *`,
        [message, thisUserCode, partnersCode],
        (err,results) => {
            if(err) console.error(err);
            console.log(` Message inserted`);
            res.sendStatus(200);
        }
    )
});




module.exports = router;