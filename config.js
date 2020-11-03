require('dotenv').config({ path: '.env' });
const config = Object.assign({}, process.env);
module.exports = config;
