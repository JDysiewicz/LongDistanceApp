const env = process.env.NODE_ENV || "development";
let keys;
if(env === "development"){
    keys = require("../../secrets/keys.js")
} else {
    keys = process.env;
};

const { Pool } = require("pg");

const conString = keys.postgresURI;
const pool = new Pool({
    connectionString: conString
});

module.exports = pool;