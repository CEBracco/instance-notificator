var connectionPool = require('../connectionPool/connectionPool.js');

function broadcastMessage(message) {
    doBroadcast(connectionPool.getConnections(), message);
}

function broadcastMessageToRegistered(message) {
    doBroadcast(connectionPool.getRegisteredConnections(), message);
}

function broadcastMessageTo(intances, message) {
    doBroadcast(connectionPool.getConnectionsByCodeOrAlias(intances), message);
}

function doBroadcast(connections, message) {
    connections.forEach(connection => {
        connection.sendUTF(JSON.stringify(message));
    });
}

module.exports = {
    broadcastMessage: broadcastMessage,
    broadcastMessageToRegistered: broadcastMessageToRegistered,
    broadcastMessageTo: broadcastMessageTo
}