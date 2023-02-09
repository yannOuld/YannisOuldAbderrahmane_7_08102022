const jwt = require("jsonwebtoken")

const { JWT_SECRET, JWT_EXPIRE = '24h' } = require('./env.js');

if (!JWT_SECRET) throw new Error(" JWT_SECRET missing from .env");

const verify = (token) => jwt.verify(token, JWT_SECRET);

const sign = (data) => jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRE });

module.exports = { verify, sign }