var config = require('../../../../../config/config');
var logger = require('../../../../../utils/logger/logger');
var connectionPool = require('../connectionPool/connectionPool');

var protocol = config.get('WEBSOCKET_PROTOCOL');

function start(server) {
    var WebSocketServer = require('websocket').server;
    wsServer = new WebSocketServer({
        httpServer: server,
        autoAcceptConnections: false
    });
    
    wsServer.on('connect', function(connection){
        logger.debug((new Date()) + ' Connection accepted.');
        //connectionPool.pushConnection(connection);
    })

    wsServer.on('request', function (request) {
        if (!originIsAllowed(request.origin)) {
            // Make sure we only accept requests from an allowed origin
            request.reject();
            logger.debug((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
            return;
        }
        var connection = request.accept(protocol, request.origin);
        connection.on('message', function (message) {
            onMessage(connection, message);
        });
    });

    wsServer.on('close', function (connection) {
        connectionPool.removeConnection(connection);
        logger.debug((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    })
}

function onMessage(connection, message) {
    if (message.type === 'utf8') {
        logger.debug('Received Message: ' + message.utf8Data);
        try {
            var messageData = JSON.parse(message.utf8Data);
            if (messageData.type == 'REGISTRATION') {
                connectionPool.registerConnection(connection, messageData.code, messageData.alias);
            }
        } catch (error) {
            logger.error("Can't parse received message, ignored");
        }
    }
}

function originIsAllowed(origin) {
    return true;
}

module.exports = {
    start: start
}