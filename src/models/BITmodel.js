const fetch = require('node-fetch');
const config = require('../../config');

const API_KEY = config.bitcoin.APIKey;
const STATUS_USER_ERROR = 422;
const CURRENT_REQUEST = 'https://api.coindesk.com/v1/bpi/currentprice.json';
//https://api.coindesk.com/v1/bpi/currentprice.json
const HISTORY_REQUEST = 'https://api.coindesk.com/v1/bpi/historical/close.json';
//https://api.coindesk.com/v1/bpi/historical/close.json

const getCurrentPrice = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getHistoricalPrice = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

module.exports = {
  getCurrentPrice,
  getHistoricalPrice
};
