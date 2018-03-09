const fetch = require('node-fetch');
const config = require('../../config');

const API_KEY = config.bitcoin.APIKey;
const STATUS_USER_ERROR = 422;

const getData = (request) => {
  return fetch(request)
      .then(res => res.json())
      .catch(err => err);
};

module.exports = {
  getData,
};
