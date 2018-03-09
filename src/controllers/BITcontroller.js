const express = require('express');
const router = express.Router();

const { getCurrentData, getHistoricalData } = require('../models/BITmodel');

const STATUS_USER_ERROR = 422;

let currentPrice = 0;
let currentPriceTime;
let previousPrice = 0;
let previousPriceTime;
let differenceBetweenValues = 0;

router.get('/compare', (req, res) => {
  if (!currentPrice) {
    getCurrentData()
      .then(data => {
        currentPrice = data.bpi.USD.rate_float;
        currentPriceTime = data.time.updated;
        res.send({
          currentDayInformation: {
            currentDayValue: currentPrice,
            timeOfValue: currentPriceTime,
          },
        });
      })
      .catch(err => console.log('There was an error: ', err));
  } else {
    getHistoricalData()
      .then(data => {
        previousPrice = Object.values(data.bpi)[0];
        previousPriceTime = data.time.updated;
        differenceBetweenValues = currentPrice - previousPrice;
        res.send({
          previousDayInformation: {
            previousDayValue: previousPrice,
            timeOfValue: previousPriceTime,
          },
          currentDayInformation: {
            currentDayValue: currentPrice,
            timeOfValue: currentPriceTime,
          },
          priceDifference: differenceBetweenValues,
        });
      })
      .catch(err => console.log('There was an error: ', err));
  }
});

router.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send('Page not found');
});

module.exports = router;
