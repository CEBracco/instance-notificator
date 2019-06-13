var config = require('../../../../config/config')
var notification = require('./notification/notification');
var websocketUtils = require('./utils/websocketUtils');

function sendDeployNotification(instances, version, build) {
    if(instances != null && instances.length > 0){
        websocketUtils.broadcastMessageTo(instances, notification.deployNotification(version, build));
    } else {
        websocketUtils.broadcastMessageToRegistered(notification.deployNotification(version, build));
    }
}

module.exports = {
    sendDeployNotification: sendDeployNotification
}