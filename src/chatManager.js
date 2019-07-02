const uuidv4 = require('uuid/v4')


// Creates a user.
const createUser = ({name = "", socketId = null} = {}) => (
    {
        id: uuidv4(),
        name,
        socketId
    }
);

// Creates a messages object.
const createMessage = ({message = "", sender = ""} = {}) => (
    {
        id: uuidv4(),
        time: new Date(Date.now()),
        message,
        sender
    }
);

// Creates a Chat object
const createChat = ({messages = [], name = "Community", users = []} = {}) => (
    {
        id: uuidv4(),
        name,
        messages,
        users,
        typingUsers:[]
    }
);

module.exports = {
    createUser,
    createMessage,
    createChat,
};
