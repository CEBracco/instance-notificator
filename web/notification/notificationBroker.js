var logger =  require('../../utils/logger/logger');
var config = require('../../config/config');
var senders = [];

for (sender of config.get('NOTIFICATION_SENDERS').split(',')) {
   senders.push(require(`./senders/${sender}Sender/${sender}Sender.js`));
}

function sendDeployNotification(instances, version, build){
  logger.info(`About to send DEPLOY notifications to ${instances?instances:"all"} using ${version ? version : "@latest"} version and ${build ? build : "@latest"} build`);
  for (sender of senders) {
    sender.sendDeployNotification(instances, version, build);
  }
}

module.exports = {
  sendDeployNotification:sendDeployNotification
}
