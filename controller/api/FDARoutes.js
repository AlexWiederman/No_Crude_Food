const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Route to get FDA information
router.get('/fdaInfo', async (req, res) => {

  try {
    const response = await fetch('https://api.fda.gov/drug/label.json');
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (err) {
    // Handle any errors that occur during fetch request
    res.status(500).json({ message: 'Error fetching FDA information' });
  }
});

module.exports = router;
