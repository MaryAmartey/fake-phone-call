'use strict';
const express = require('express');
const bodyParser = require('body-parser'); 
const WebSocket = require('ws');
const executorFunction = require('./chatModel.js');
const routes = require('./routes.js')
const { sendMessagesToRecipients } = require('./send_sms.js');
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());

// API route to handle sending SMS with location
app.post('/sendSMS', async (req, res) => {
  const { recipients, message } = req.body;

  try {
    // Send SMS to multiple recipients
      await sendMessagesToRecipients(recipients, message);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'An error occurred while sending the SMS.' });
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});



let text = ''
let response = ''
// Create a WebSocket server using the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket connected')

  // Handle incoming messages from the WebSocket client
  ws.on('message', async (message) => {
    text = message.toString('utf-8');
    console.log('Received message:', text);
    //response = "Info sent from chat Model"
    response = await executorFunction(text)
    // Send a response back to the WebSocket client
    console.log("response:", response)
    //const question = "What about you Mary? What is your favorite comfort food?"
    ws.send(response)
  })
  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('WebSocket disconnected');
  })
});

module.exports = { text };



