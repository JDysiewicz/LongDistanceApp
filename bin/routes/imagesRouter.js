const { Router } = require("express");
const pool = require("../services/postgresConfig.js");
const router = Router();

// Get image from form data and handle image
const multer = require("multer");
const upload = multer();
const { cloudinary, imageCompress } = require("../services/cloudinaryConfig.js");


router.post("/upload",upload.single("avatar"), (req,res) => {
    return new Promise( async (resolve, reject) => {
        const user = req.user;
        const imageMinified = await imageCompress(req.file.buffer);

        // Convert the image to base64 for storage in cloudinary
        const base64 = imageMinified.toString("base64");
        
        // Store in cloudinary database
        cloudinary.uploader.upload(`data:image/jpeg;base64,${base64}`, {
            transformation: {
                width: 35,
                crop: "scale",
                quality: 100
            }
        }, (err, results) => {
            if(err) console.error(err);

            // If successful, attempt to update avatar of user with the link to the image
            pool.query(
                `UPDATE users SET avatar=$1 WHERE partner_code=$2 RETURNING *`,
                [results.url, user.partner_code],
                (error, resultsSql) => {
                    if(error) return reject(error);
                    console.log("Updated user: ", resultsSql.rows);

                    // Reserialize to update profile picture
                    req.login(resultsSql.rows[0], (error) => {
                        if(error) return console.error(error);
                        return resolve(res.redirect("/"));
                    });
                }
            )
        });
    });
});


module.exports = router;
