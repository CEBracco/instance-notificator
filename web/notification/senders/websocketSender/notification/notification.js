var config = require('../../../../../config/config');

function deployNotification(version, build) {
    var notification = {
        type: "DEPLOY",
        extra: {
            version: version,
            build: build 
        }
    };
    return notification;
}

module.exports = {
    deployNotification: deployNotification
}
