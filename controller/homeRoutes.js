const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/fdaData', async (req, res) => {
  try {
    // Make fetch request to FDA API to get data
    const response = await fetch('https://api.fda.gov/drug/event.json?limit=10');
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (err) {
    // Handle any errors that occur during fetch request
    res.status(500).json({ message: 'Error fetching FDA data' });
  }
});

module.exports = router;
