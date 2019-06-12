var logger =  require('../../utils/logger/logger.js');
var config = require('../../config/config.js');
var port = config.get('PORT');
var useSSL = config.getBoolean('USE_SSL');
var express = require('express');
var app = express();
var secure = require('express-force-https');

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

function initWebsocketServer(server) {
  var wsServer = require('../notification/websocket/server/websocketServer.js');
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
