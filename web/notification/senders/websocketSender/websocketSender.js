var config = require('../../../../config/config')
var notification = require('./notification/notification');
var websocketUtils = require('./utils/websocketUtils');

function sendDeployNotification(data) {
    websocketUtils.broadcastMessage(notification.deployNotification(data));
}

module.exports = {
    sendDeployNotification: sendDeployNotification
}