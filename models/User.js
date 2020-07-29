const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    familyName: String,
    givenName: String
});

mongoose.model("user", userSchema);