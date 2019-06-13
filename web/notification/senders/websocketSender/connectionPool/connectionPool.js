global.websocketConnections = [];
let _ = require('lodash');

function pushConnection(connection) {
    global.websocketConnections.push(connection);
}

function removeConnection(connection) {
    global.websocketConnections = _.without(global.websocketConnections, _.find(global.websocketConnections, { code: connection.code }));
}

function getConnections(filterFunction = function(connection){ return true }) {
    return _.filter(global.websocketConnections, filterFunction);
}

function getRegisteredConnections() {
    return getConnections(function (connection) {
        return connection.code && connection.alias;
    });
}

function getConnectionsByCodeOrAlias(names) {
    return getRegisteredConnections(function(connection){
        return _.includes(names, connection.code) || _.includes(names, connection.alias);
    });
}

function registerConnection(connection, code, alias) {
    connection.code = code;
    connection.alias = alias;
    removeConnection(connection);
    pushConnection(connection);
    //if (!getConnectionsByCodeOrAlias(code) && !getConnectionsByCodeOrAlias(alias)) {
    //}
}

module.exports = {
    pushConnection: pushConnection,
    removeConnection: removeConnection,
    getConnections: getConnections,
    getRegisteredConnections: getRegisteredConnections,
    getConnectionsByCodeOrAlias: getConnectionsByCodeOrAlias,
    registerConnection: registerConnection
}