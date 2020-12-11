const axios = require('axios');
const SERVER_URL = "http://127.0.0.1:8082"

headers = {'Access-Control-Allow-Origin': SERVER_URL}
exports.getTransactions = async () => {
  const res = await axios.get(SERVER_URL + '/transactions');
  return res.data;
};

exports.createTransaction = async(type, ammount) => {
  await axios.post(SERVER_URL + '/transactions', {type, ammount}, {headers});
}