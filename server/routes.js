const express = require('express');
const router = express.Router()
const chatModel = require('./chatModel')

router.get('/chat', async (req, res) => {
    //res.send("Hello World")
    try {
      const result = await chatModel();
      res.send(result);
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  });

module.exports = router;