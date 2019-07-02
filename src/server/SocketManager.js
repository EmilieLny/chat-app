const io = require('./index').io;

const {
    VERIFY_USER,
    USER_CONNECTED,
    USER_DISCONNECTED,
    LOGOUT,
} = require('../const');

const { createChat, createUser, createMessage } = require('../chatManager');

let connectedUsers = {};

// Check if the username already exist
const isUser = (userList, username) => {
    return username in userList
};

// Removes user from the list
const removeUser = (userList, username) => {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList
};

// Adds user to the list
const addUser = (userList, user) => {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList
};

module.exports = function(socket){

    console.log(`socket id: ${socket.id}`);

    // Callback: Check if the username already exist
    socket.on(VERIFY_USER, (nickname, callback) => {
        if( isUser(connectedUsers, nickname) ){
            callback( {
                isUser: true,
                user: null
            } )
        } else {
            callback( {
                isUser: false,
                user: createUser({ name: nickname, socketId: socket.id })
            })
        }
    });

    //User Connects with username
    socket.on(USER_CONNECTED, (user)=>{
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        io.emit(USER_CONNECTED, connectedUsers);
        console.log(connectedUsers);

    });

    // User disconnected
    socket.on('disconnect', () => {
        if("user" in socket){
            connectedUsers = removeUser(connectedUsers, socket.user.name);

            io.emit(USER_DISCONNECTED, connectedUsers);
            console.log("Disconnect", connectedUsers);
        }
    });


    // User logout
    socket.on(LOGOUT, () => {
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        io.emit(USER_DISCONNECTED, connectedUsers);
        console.log("Disconnect", connectedUsers);

    });

};
