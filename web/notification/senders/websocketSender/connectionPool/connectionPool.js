global.websocketConnections = [];
let _ = require('lodash');
var logger = require('../../../../../utils/logger/logger');

function pushConnection(connection) {
    global.websocketConnections.push(connection);
}

function removeConnection(connection) {
    //global.websocketConnections = _.without(global.websocketConnections, _.find(global.websocketConnections, { code: connection.code }));
    //global.websocketConnections = _.without(global.websocketConnections, _.find(global.websocketConnections, { remoteAddress: connection.remoteAddress }));
    global.websocketConnections = _.without(global.websocketConnections, _.find(global.websocketConnections, { identifier: connection.identifier }));
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
    return getConnections(function(connection){
        return _.includes(names, connection.code) || _.includes(names, connection.alias);
    });
}

function registerConnection(connection, code, alias) {
    if (getConnectionsByCodeOrAlias([code]).length == 0 && getConnectionsByCodeOrAlias([alias]).length == 0) {
        connection.code = code;
        connection.alias = alias;
        pushConnection(connection);
    } else {
        logger.error("Connection is already used, closing connection...");
        connection.drop(connection.CLOSE_REASON_INVALID_DATA, "Instance code/alias is already used");
    }
}

module.exports = {
    pushConnection: pushConnection,
    removeConnection: removeConnection,
    getConnections: getConnections,
    getRegisteredConnections: getRegisteredConnections,
    getConnectionsByCodeOrAlias: getConnectionsByCodeOrAlias,
    registerConnection: registerConnection
}
