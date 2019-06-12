var logger =  require('../../utils/logger/logger');
var config = require('../../config/config');
var senders = [];

for (sender of config.get('NOTIFICATION_SENDERS').split(',')) {
   senders.push(require(`./senders/${sender}Sender/${sender}Sender.js`));
}

function sendDeployNotification(data){
  logger.debug('Sending DEPLOY notifications!');
  for (sender of senders) {
    sender.sendDeployNotification(data);
  }
}

module.exports = {
  sendDeployNotification:sendDeployNotification
}
