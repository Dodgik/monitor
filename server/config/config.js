const env = process.env.NODE_ENV || 'development';
//const configJson = require('./config.json');
const fs = require('fs');
const ini = require('ini');
const configJson = ini.parse(fs.readFileSync('./config/config.ini', 'utf-8'))
//console.log('configJson=', configJson)
let defaultConfig = {
  "protocol": "http",
  "host": "localhost:3000",

  "database": {
    "username": "sa",
    "password": "avas",
    "database": "monitor",
    "host": "127.0.0.1",
    "dialect": "mssql",
  },

  "mail_sender": "vasiliy017@gmail.com",
  "mail_user": "vasiliy017@gmail.com",
  "mail_password": "",
}

for (let key in configJson) {
  defaultConfig[key] = configJson[key]
}
//console.log('config=', defaultConfig)

module.exports = defaultConfig;