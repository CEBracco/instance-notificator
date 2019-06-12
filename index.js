var _ = require('lodash');
var logger = require('./utils/logger/logger');
var server = require('./web/server/server');

function startApp() {
    server.start();
}

startApp();