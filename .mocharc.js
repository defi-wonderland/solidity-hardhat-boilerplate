const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  require: ['hardhat/register'],
  extension: ['.ts'],
  ignore: ['./test/utils/**'],
  recursive: true,
  timeout: process.env.MOCHA_TIMEOUT || 300000,
};
