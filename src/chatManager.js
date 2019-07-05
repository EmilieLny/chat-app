const uuidv4 = require('uuid/v4');


// Creates a user
const createUser = ({name = "", socketId = null, avatar} = {}) => (
    {
        id: uuidv4(),
        name,
        socketId,
        avatar
    }
);

// Creates a messages object
const createMessage = ({message = "", sender = "", avatar} = {}) => (
    {
        id: uuidv4(),
        time: getTime(new Date(Date.now())),
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

const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
};

module.exports = {
    createUser,
    createMessage,
    createChat,
};
