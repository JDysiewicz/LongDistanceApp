const { Pool } = require("pg");

// Deployment!
const keys = process.env;

// // DEV
// const keys = require("../../secrets/keys.js");


const conString = keys.postgresURI;
const pool = new Pool({
    connectionString: conString
});

module.exports = pool;