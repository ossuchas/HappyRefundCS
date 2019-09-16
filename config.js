// const dotenv = require('dotenv');
// dotenv.config();
// require('dotenv').config()
// module.exports = {
// //   endpoint: process.env.API_URL,
// //   masterKey: process.env.API_KEY,
// //   port: process.env.PORT,
//   node_env: process.env.NODE_ENV
// };

// export const node_env = process.env.NODE_ENV

// console.log(process.env.API_URL);
// const dotenv = require('dotenv');
// dotenv.config();

// gatsby-config.js

// export const config = {
//   node_env: process.env.NODE_ENV,
//   api_url: process.env.API_URL
// };

require("dotenv").config({
    node_env: `.env.${process.env.NODE_ENV}`,
  })

module.exports = {
  node_env: process.env.NODE_ENV
};
