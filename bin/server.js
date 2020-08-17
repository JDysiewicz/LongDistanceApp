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
    
    socket.on("join", ({user}, callback) => {
        const { error } = addUser({user, socketId: socket.id});
        if (error){
            console.error(error)
            callback({error});
        };

        socket.join();
        socket.emit("loggedIn", {text: `${user.given_name} is now online!`});
        
        if(getAllUsers().find(element => element.has_partner === user.partner_code)){
            io.emit("partnersOnline", {status: true});
        };
    });

    socket.on("disconnect", () => {
        console.log(`User has disconnected`);
        socket.emit("loggedOut", {text: `User is now offline`});
        io.emit("partnersOnline", {status: false});
        removeUser(socket.id);
    });

    socket.on("sendMessage", (message) => {
        if(/!myNick=.{1,20}/.exec(message.message)){
            const newNick =  message.message.split("!myNick=")[1];
            changeUserNick({newNick, partner_code: message.sender_partner_code})
             .then(res => io.emit("message", {message: `${res.given_name} Changed their own nickname to '${newNick}'`, admin: true}));
            
        } else if(/!partnerNick=.{1,20}/.exec(message.message)){
            const newNick =  message.message.split("!partnerNick=")[1];
            changeUserNick({newNick, partner_code: message.recipient_partner_code})
             .then(res => io.emit("message", {message: `${res.given_name}'s nickname was changed to '${newNick}!'`, admin: true}));
            
        } else {
            insertMessage({message: message.message, sender_partner_code: message.sender_partner_code, recipient_partner_code: message.recipient_partner_code, time_sent: message.time_sent});
            io.emit("message", message);
        }
    });

    socket.on("checkOnline", ({partner, currentStatus}) => {
        console.log("Emit reviecec")
        if(getUser(partner) !== currentStatus){
            socket.emit("changeOnlineStatus");
        };
        
    });
});


// Starts the server
server.listen(PORT, () => {
    console.log("Now listening on port ", PORT)
});

module.exports = io;
