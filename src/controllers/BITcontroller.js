const express = require('express');
const router = express.Router();

const { getCurrentPrice, getHistoricalPrice } = require('../models/BITmodel');

const STATUS_USER_ERROR = 422;

let currentPrice = 0;
let previousPrice = 0;
let differenceBetweenValues = 0;

router.get('/compare', (req, res) => {
  if (!currentPrice) {
    getCurrentPrice()
      .then(data => {
        currentPrice = data.bpi.USD.rate_float;
        res.send({ currentDayValue: currentPrice });
      })
      .catch(err => console.log('There was an error: ', err));
  } else {
    getHistoricalPrice()
      .then(data => {
        previousPrice = Object.values(data.bpi)[0];
        differenceBetweenValues = currentPrice - previousPrice;
        res.send({ previousDayValue: previousPrice, differenceBetweenValues: differenceBetweenValues });
      })
      .catch(err => console.log('There was an error: ', err));
  }
});

module.exports = router;
