var WebSocket = require('ws');
var fs = require('fs');
var http = require('http');
var express = require('express');
var server = express();

var replWss = new WebSocket.Server({ port: 8902 });
var browserWss = new WebSocket.Server({ port: 8903 });

server.listen(8901, function() {
  console.log('start server');
});


server.use(express.static(__dirname + '/src'));
server.use((req, res) => {
  res.sendStatus(404);
});


replWss.on('connection', ws => {
  console.dir("REPL connection is established.");

  // when a message is recieved from repl, send it to browser
  ws.on('message', fromReplMsg => {
    browserWss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(fromReplMsg);
      }
    });
  });
});


browserWss.on('connection', ws => {
  // when a message is recieved from browser, send it to repl
  ws.on('message', fromBrowserMsg => {
    replWss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(fromBrowserMsg);
      }
    });
  });
});


fs.watch('src/index.html', function(event, filename) {
  console.dir("index.html is changed. reload browser.");
  browserWss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('operatemessage:reloadbrowser');
    }
  });
});


fs.watch('src/app.scm', function(event, filename) {
  console.dir("app.scm is changed. reload browser.");
  browserWss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send('operatemessage:reloadbrowser');
    }
  });
});

