const sessionIdToUserMap = new Map();

function setUser(id, sessionId) {
    sessionIdToUserMap.set(id, sessionId);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}