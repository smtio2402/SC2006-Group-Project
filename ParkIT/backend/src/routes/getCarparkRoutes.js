const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/api/carpark-availability', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.data.gov.sg/v1/transport/carpark-availability'
    );
    res.json(response.data.items[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching carpark data' });
  }
});
