const Sequelize = require('sequelize');
var dbSession = require('../dbSession');

const User = dbSession.define('user', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstname: { type: Sequelize.STRING, notEmpty: true },
  lastname: { type: Sequelize.STRING, notEmpty: true },
  username: { type: Sequelize.TEXT },

  reset_code: { type: Sequelize.STRING(32) },

  last_login: { type: Sequelize.DATE },
  status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }
});

module.exports = User