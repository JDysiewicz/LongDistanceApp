const users = [];

const addUser = ({user, socketId}) => {
    const existingUser = users.find(inArray => user.id === inArray.id);
    if(existingUser) return {error: "Already logged into chat!"};
    users.push({...user, socketId});
    return {success: "User added to chat!"};
};

const removeUser = (socketId) => {
    const index = users.findIndex( inArray => inArray.socketId === socketId);
    if(index !== -1) return users.splice(index, 1)[0];
};

const getUser = (userToFind) => users.find((user) => user.id === userToFind.id)

const getAllUsers = () => {return users}

module.exports = { addUser, removeUser, getUser, getAllUsers }