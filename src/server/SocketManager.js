const io = require('./index').io;
let randomAvatar = require('random-avatar');

const {
    COMMUNITY_CHAT,
    VERIFY_USER,
    USER_CONNECTED,
    USER_DISCONNECTED,
    MESSAGE_SENT,
    MESSAGE_RECEIVED,
} = require('../const');

const { createChat, createUser, createMessage } = require('../chatManager');

let connectedUsers = {};

let communityChat = createChat();

// Check if the username already exist
const checkUserAvailable = (userList, username) => {
    return username in userList
};

// Adds user to the list
const addUser = (userList, user) => {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList
};

// Returns a function that will take a chat id and message and emit it to the corresponding chat id
function sendMessageToChat(sender, avatar) {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage( { message, sender, avatar } ))
    }
}


// Removes user from the list
const removeUser = (userList, username) => {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList
};


module.exports = function(socket){

    console.log(`Socket id: ${socket.id}`);

    let sendMessageToChatFromUser;

    // 1. Callback: Check if the username already exist
    socket.on(VERIFY_USER, ( nickname, callback ) => {
        if( checkUserAvailable( connectedUsers, nickname ) ) {
            callback( {
                isUserExisting: true,
                user: null
            } )
        } else {
            callback( {
                isUserExisting: false,
                user: createUser({
                    name: nickname,
                    socketId: socket.id,
                    avatar: `${randomAvatar({protocol: 'https'})}?d=identicon`,
                })
            })
        }
    });

    // 2. User Connects with username
    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        sendMessageToChatFromUser = sendMessageToChat(user.name, user.avatar);

        io.emit(USER_CONNECTED, connectedUsers);
        console.log(JSON.stringify(connectedUsers, undefined, 2));
    });

    // 3. Get Community Chat // used as soon as someone write something
    socket.on(COMMUNITY_CHAT, (callback) => {
        callback(communityChat)
    });

    // 4. send the message to the matching chat
    socket.on(MESSAGE_SENT, ( { chatId, message } ) => {
        sendMessageToChatFromUser(chatId, message)
    });

    // User disconnected / close the tab
    socket.on('disconnect', () => {
        if("user" in socket){
            connectedUsers = removeUser(connectedUsers, socket.user.name);

            io.emit(USER_DISCONNECTED, connectedUsers);
            console.log("Disconnect", connectedUsers);
        }
    });
};


