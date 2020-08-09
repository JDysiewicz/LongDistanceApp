const pool = require("../bin/services/postgresConfig.js"); 
const insertMessage = ({message, sender_partner_code, recipient_partner_code, time_sent}) => {
    pool.query(
        `INSERT INTO messages(sender_partner_code, recipient_partner_code, message, time_sent) VALUES($1, $2, $3, $4) RETURNING *`,
        [sender_partner_code, recipient_partner_code, message, time_sent],
        (err, results) => {
            if(err) return console.error(err)
            console.log("Message added: ", results.rows)
        }
    )
};

module.exports = { insertMessage };