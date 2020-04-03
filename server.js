const express = require('express');
const favicon = require('serve-favicon');
const https = require('https');
const http = require('http');
const fs = require('fs');

const options = {};

var app = express();

app.use(favicon(__dirname + '/dist/favicon.png'));

app.get('/bundle.js', function (req, res) {
  res.set('Content-Encoding', 'x-gzip');
  res.set('Content-Type', 'application/x-gzip');
  res.sendFile(__dirname + '/public/bundle.js.gz');
});

app.use(express.static('public'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
https.createServer(options, app).listen(443);