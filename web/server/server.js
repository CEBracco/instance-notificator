var _ = require('lodash');
var logger =  require('../../utils/logger/logger.js');
var config = require('../../config/config.js');
var port = config.get('PORT');
var useSSL = config.getBoolean('USE_SSL');
var express = require('express');
var app = express();
var secure = require('express-force-https');
var notificationBroker = require('../notification/notificationBroker');

if (useSSL) {
  app.use(secure);
}
app.use(express.json());

app.use('/', express.static(__dirname + '/app/static'));
app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get(['/','/index.html'], function(req, res){
  res.render("index", {});
});

app.post(['/notify/deploy'], function (req, res) {
  if (req.body.serviceToken == config.get('WEBSOCKET_SEND_TOKEN')){
    notificationBroker.sendDeployNotification(req.body.instances, req.body.version, req.body.build);
    res.json({ok:true, message:"All deploy notifications sended!"});
  } else {
    res.json({ok:false, message:"Unauthorized"});
  }
});

app.get(['/connections'], function (req, res) {
  var connectionPool = require('../notification/senders/websocketSender/connectionPool/connectionPool');
  res.json({instances: _.map(connectionPool.getRegisteredConnections(), function(connection){
    return {
      code: connection.code,
      alias: connection.alias,
      remoteAddress: connection.remoteAddress
    }
  })})
});

function initWebsocketServer(server) {
  var wsServer = require('../notification/senders/websocketSender/server/websocketServer.js');
  return wsServer.start(server);
}

function start(){
  const server = require('http').createServer(app);
  initWebsocketServer(server);
  server.listen(port, function () {
    logger.debug("Static file server running at port => " + port);
  });
}

module.exports = {
  start:start
}
