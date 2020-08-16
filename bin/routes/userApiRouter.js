const { Router } = require("express");
const pool = require("../services/postgresConfig.js");
const router = Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const multer = require("multer");
const upload = multer({dest: "../client/public/images"});

router.get("/current_user", (req,res) => {
    res.send(req.user);
});

router.get("/partner",  (req,res) => {
    pool.query(
        `SELECT * FROM users WHERE partner_code=$1`,
        [req.user.has_partner],
        (err, results) => {
            if(err) return console.error(err);
            const partner = results.rows[0];
            res.send(partner)
        }
    );
});

router.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


// Removes the request
router.post("/remove-request", (req,res) => {
    const partnersCode = req.user.sent_request;
    const thisUsersCode = req.user.partner_code;
    
    // Update the (un)desired account's has_request
    pool.query(
        `UPDATE users SET has_request=$1 WHERE partner_code=$2 AND has_request=$3 RETURNING *`,
        [null, partnersCode, thisUsersCode],
        (err, results) => {
            if (err) return console.error(err);
            if(results.rows.length === 0) return console.error("You do not have a request sent to that user");
            
            // Update the current user
            pool.query(
                `UPDATE users SET sent_request=$1 WHERE partner_code=$2 RETURNING *`,
                [null, thisUsersCode],
                (err, results) => {
                    if (err) return console.error(err);

                    // Reserializes user to update info
                    req.login(results.rows[0], (error) => {
                        if(error) return console.error(error);
                        return res.redirect("/");
                    });
                }
            );
        }
    );
});


// Decline Request
router.post("/decline-request", (req,res) => {
    const partnersCode = req.user.has_request;
    const thisUsersCode = req.user.partner_code;
    
    // Update the (un)desired account's sent_request
    pool.query(
        `UPDATE users SET sent_request=$1 WHERE partner_code=$2 AND sent_request=$3 RETURNING *`,
        [null, partnersCode, thisUsersCode],
        (err, results) => {
            if (err) return console.error(err);
            if(results.rows.length === 0) return console.error("That users request is no longer valid");
            
            // Update the current user
            pool.query(
                `UPDATE users SET has_request=$1 WHERE partner_code=$2 RETURNING *`,
                [null, thisUsersCode],
                (err, results) => {
                    if (err) return console.error(err);

                    // Reserializes user to update info
                    req.login(results.rows[0], (error) => {
                        if(error) return console.error(error);
                        return res.redirect("/");
                    });
                }
            );
        }
    );
});

router.post("/changepic", upload.single("avatar"), (req, res) => {
    const user = req.user.partner_code;
    pool.query(
        `UPDATE users SET avatar=$1 WHERE partner_code=$2 RETURNING *`,
        [req.file.filename, user],
        (err, results) => {
            if (err) console.error(err);
            console.log("Profile picture updated", results.rows);
            return res.redirect("/");
        }
    );
});



// DePartner the couple
router.post("/departner", (req,res) => {
    const partnersCode = req.user.has_partner;
    const thisUsersCode = req.user.partner_code;
    
    // Remove from partner table
    pool.query(
        `DELETE FROM partners WHERE partner1=$1 OR partner2=$1`,
        [thisUsersCode],
        (err, results) => {
            if(err) return console.error(err);
            console.log("Deleted Partnership");

            // De partner 1 in the users table
            pool.query(
                `UPDATE users SET has_partner=$1, sent_request=$1, nickname=given_name, has_request=$1 WHERE partner_code=$2 RETURNING *`,
                [null, partnersCode],
                (err, results) => {
                    if (err) return console.error(err);
                    if(results.rows.length === 0) return console.error("That users request is no longer valid");
        
                    // De partner 2 in the users table
                    pool.query(
                    `UPDATE users SET has_partner=$1, sent_request=$1, nickname=given_name, has_request=$1 WHERE partner_code=$2 RETURNING *`,
                    [null, thisUsersCode],
                    (err, results) => {
                        if (err) return console.error(err);
                        if(results.rows.length === 0) return console.error("That users request is no longer valid");

                        // Reserializes user to update info
                        req.login(results.rows[0], (error) => {
                            if(error) return console.error(error);
                            return res.redirect("/");
                        });
                        }
                    );
                }
            );
        }
    );
});


// Sends partner request 
router.post("/send-request", urlencodedParser, (req,res) => {
    const partnersCode = req.body.partnerscode.toString().split("").join("-");
    const thisUserCode = req.user.partner_code;

    // Finds the desired account partner in the db
    pool.query(
        `SELECT * FROM users WHERE partner_code=$1`,
        [partnersCode],
        (err, results) => {
            if(err) return console.error(err);
            if(results.rows.length === 0 ) return res.send("No user by that code");
            if(results.rows[0].partner_code === thisUserCode) return res.send("That's your code!")

            // Prevents sending multiple requests/requests to already partnered accounts
            if(results.rows[0].has_partner !== null) return res.send("User already has a partner :(")
            if(results.rows[0].has_request !== null) return res.send("User already has a pending request :(")

            // If all is well, will give the desired account a partner request, and the current user a sent request
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

                            // Reserializes user to update info
                            req.login(results.rows[0], (error) => {
                                if(error) return console.error(error);
                                return res.redirect("/");
                            });
                        }
                    )
                }
            )
        }
    )

});

// Links two accounts together from a request
router.post("/partner-up", (req,res) => {
    const thisUserCode = req.user.partner_code;
    const partnersCode = req.user.has_request;

    // Creates new entry in partner table
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

                            // Reserializes user to update info
                            req.login(results.rows[0], (error) => {
                                if(error) return console.error(error);
                                return res.redirect("/");
                            })
                        }
                    );
                }
            );
        }
    );
});


module.exports = router;