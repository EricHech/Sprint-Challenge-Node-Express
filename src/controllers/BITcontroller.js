const express = require('express');
const router = express.Router();

const { getData } = require('../models/BITmodel');

const STATUS_USER_ERROR = 422;

const CURRENT_REQUEST = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const HISTORY_REQUEST = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

router.get('/compare', (req, res) => {
  const currentRequest = getData(CURRENT_REQUEST)
    .then(data => {
      return {
        currentDayInformation: {
          currentDayValue: data.bpi.USD.rate_float,
          timeOfValue: data.time.updated,
        },
      };
    })
    .catch(err => console.log('There was an error: ', err));

  const historyRequest = getData(HISTORY_REQUEST)
    .then(data => {
      return {
        previousDayInformation: {
          previousDayValue: Object.values(data.bpi)[0],
          timeOfValue: data.time.updated,
        },
      };
    })
    .catch(err => console.log('There was an error: ', err));

  return Promise.all([currentRequest, historyRequest])
    .then(currencyInfo => {
      const difference =
        currencyInfo[0].currentDayInformation.currentDayValue -
        currencyInfo[1].previousDayInformation.previousDayValue;

      const sign = Math.sign(difference);
      let response;
      if (sign === 1) response = 'increased by $';
      if (sign === 0) response = 'not changed, the difference is $';
      if (sign === -1) response = 'decreased by $';

      res.send({
        ...currencyInfo[1],
        ...currencyInfo[0],
        differenceInformation: {
          differenceValue: difference,
          differenceString: `The price has ${response}${difference}`,
        },
      });
    })
    .catch(err => console.log('There was an error: ', err));
});

router.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send('Page not found');
});

module.exports = router;
