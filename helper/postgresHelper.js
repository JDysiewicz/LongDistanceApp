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

const changeUserNick = ({newNick, partner_code}) => {
    return new Promise( (resolve,reject) => {
        pool.query(
            `UPDATE users SET nickname = $1 WHERE partner_code = $2 RETURNING *`,
            [newNick, partner_code],
            (err, results) => {
                if(err) return reject(new Error(err));
                console.log("Nickname Updated", results.rows)
                return resolve(results.rows[0]);
            }
        );
    });

};


module.exports = { insertMessage, changeUserNick };