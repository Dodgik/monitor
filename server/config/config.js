module.exports = {
  "development": {
    "protocol": "http",
    "host": "localhost:3000",

    "database": {
      "username": "sa",
      "password": "avas",
      "database": "monitor",
      "host": "127.0.0.1",
      "dialect": "mssql",
      "dialectOptions": {
        "instanceName": "SYMBIOSIS2"
      }
    },

    "mail_sender": "vasiliy017@gmail.com",
    "mail_user": "vasiliy017@gmail.com",
    "mail_password": "",
  },
  "production": {
    "protocol": "http",
    "host": "localhost:3000",

    "database": {
      "username": "sa",
      "password": "avas",
      "database": "monitor",
      "host": "127.0.0.1",
      "dialect": "mssql",
      "dialectOptions": {
        "instanceName": "SYMBIOSIS2"
      }
    },

    "mail_sender": "vasiliy017@gmail.com",
    "mail_user": "vasiliy017@gmail.com",
    "mail_password": "",
  }
}