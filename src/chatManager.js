const uuidv4 = require('uuid/v4');
// let randomAvatar = require('random-avatar');


// Creates a user.
const createUser = ({name = "", socketId = null, avatar} = {}) => (
    {
        id: uuidv4(),
        name,
        socketId,
        // avatar: randomAvatar()
        avatar
    }
);

// Creates a messages object.
const createMessage = ({message = "", sender = "", avatar} = {}) => (
    {
        id: uuidv4(),
        time: new Date(Date.now()),
        message,
        sender,
        avatar
    }
);

// Creates a Chat object
const createChat = ({messages = [], name = "Community", users = []} = {}) => (
    {
        id: uuidv4(),
        name,
        messages,
        users,
    }
);

module.exports = {
    createUser,
    createMessage,
    createChat,
};
