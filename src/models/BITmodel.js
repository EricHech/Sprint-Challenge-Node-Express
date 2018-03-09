const fetch = require('node-fetch');
const config = require('../../config');

const API_KEY = config.bitcoin.APIKey;
const STATUS_USER_ERROR = 422;
const CURRENT_REQUEST = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const HISTORY_REQUEST = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

const getCurrentData = () => {
  return new Promise((resolve, reject) => {
    fetch(CURRENT_REQUEST)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getHistoricalData = () => {
  return new Promise((resolve, reject) => {
    fetch(HISTORY_REQUEST)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

module.exports = {
  getCurrentData,
  getHistoricalData
};
