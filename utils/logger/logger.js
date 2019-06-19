var log4js = require('log4js');
var loggerLevel = 'debug';
log4js.configure({
  appenders: { 
    file: { type: 'file', filename: 'ws.log' }, 
    out: { type: 'stdout' } 
  },
  categories: { default: { appenders: ['file','out'], level: loggerLevel } }
});
var logger = log4js.getLogger();

function getLogger(){
  return logger;
}

module.exports = getLogger();
