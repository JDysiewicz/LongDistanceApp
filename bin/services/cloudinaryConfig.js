// Dev vs prod env
const env = process.env.NODE_ENV || "development";
let CONFIG;
if(env === "development"){
    CONFIG = require("../../secrets/keys.js").CLOUDINARY_URL;
} else {
    CONFIG = process.env.CLOUDINARY_URL;
};

// Imports for iamge handling via compression and database
const cloudinary = require("cloudinary").v2;
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');


const imageCompress = async (file)  => {
    const compressed = await imagemin.buffer(file, {
        plugins: [
            imageminMozjpeg({
                quality: 25
            }),
            imageminPngquant({
                quality: [0, 0.2],
                speed: 10
            }) 
        ]
    })

    return compressed;
};

// Configure DB
cloudinary.config(CONFIG);


module.exports = {cloudinary, imageCompress};