'use strict';
const express = require('express');
const WebSocket = require('ws');
const executorFunction = require('./chatModel.js');
const routes = require('./routes.js')
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
//app.use('/', routes)
app.get('/', (req, res) => {
    res.send('Hello World');
  });

const server = app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});


let text = ''
// Create a WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket connected')

  // Handle incoming messages from the WebSocket client
  ws.on('message', (message) => {
    text = message.toString('utf-8');
    console.log('Received message:', text);
    //executorFunction(text)

    // Send a response back to the WebSocket client
    ws.send('Message received!')
  })
  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('WebSocket disconnected');
  })
});

module.exports = { text };





