const Sequelize = require('sequelize');
var dbSession = require('../dbSession');
const User = require('./users');

const Device = dbSession.define('device', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    unique: false
  },
  latitude: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: true,
    unique: false
  },
  longitude: {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: true,
    unique: false
  }
});

module.exports = Device