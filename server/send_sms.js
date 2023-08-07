// Import the Twilio package
const twilio = require('twilio');
require('dotenv').config();
// Twilio Account SID and Auth Token from your Twilio dashboard
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


// Create a Twilio client
const client = twilio(accountSid, authToken);

// Function to send a message to a single recipient
const sendMessage = async (recipientNumber, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: '+16672880610', // Replace with your Twilio phone number
      to: recipientNumber,
    });

    console.log(`Message sent to ${recipientNumber}. SID: ${result.sid}`);
  } catch (error) {
    console.error(`Error sending message to ${recipientNumber}:`, error.message);
  }
};

// Function to send messages to multiple recipients
const sendMessagesToRecipients = async (recipients, message) => {
  //const recipients = ['+13475677496'];
  //const message = 'Hello from Twilio! This is a test message.';

  for (const recipient of recipients) {
    await sendMessage(recipient, message);
  }
};

module.exports = { sendMessagesToRecipients };
