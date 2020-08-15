const { addUser, removeUser, getUser, getAllUsers } = require("../helper/socketHelper.js");
const { insertMessage, changeUserNick }  = require("../helper/postgresHelper.js");
const app = require("../index.js");
const PORT = process.env.PORT || 5000;

// WebSocket Stuff
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server)
io.on("connection", socket => {
    console.log("new connection!");
    let activeUser;
    socket.on("join", ({user}, callback) => {
        const { success, error } = addUser({user, socketId: socket.id});
        if (error){
            console.error(error)
            callback({error});
        };

        socket.join();
        socket.emit("loggedIn", {text: `${user.given_name} is now online!`});
    });

    socket.on("disconnect", () => {
        console.log(`User has disconnected`);
        socket.emit("loggedOut", {text: `User is now offline`});
        removeUser(socket.id);
    });

    socket.on("sendMessage", (message) => {
        if(/!myNick=.{1,20}/.exec(message.message)){
            const newNick =  message.message.split("!myNick=")[1];
            changeUserNick({newNick, partner_code: message.sender_partner_code});
            io.emit("message", {message: `Changed their own nickname to ${newNick}!` });
        } else if(/!partnerNick=.{1,20}/.exec(message.message)){
            const newNick =  message.message.split("!partnerNick=")[1];
            changeUserNick({newNick, partner_code: message.recipient_partner_code});
            io.emit("message", {message: `Changed your nickname to ${newNick}!`})
        } else {
            insertMessage({message: message.message, sender_partner_code: message.sender_partner_code, recipient_partner_code: message.recipient_partner_code, time_sent: message.time_sent});
            io.emit("message", message);
        }
    });
});


// Starts the server
server.listen(PORT, () => {
    console.log("Now listening on port ", PORT)
});

module.exports = io;
