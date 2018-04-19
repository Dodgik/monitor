var express = require('express');

var passport = require('passport');
var User = require('../db/models/users');
require('../config/passport/passport.js')(passport, User);


const router = express.Router();


var dbSession = require('../db/dbSession');
var Device = require('../db/models/devices');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function (req, res, next) {
  //console.log('devices req.user: ', req.user);
  //console.log('devices req.isAuthenticated: ', req.isAuthenticated());
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //const user_id = 1;
  const user_id = req.user.id;

  Device.findAll({
    attributes: ['id', 'name', 'latitude', 'longitude'],
    where: { user_id: user_id }
  }).then(devices => {
    res.json(devices);
  })
});

router.post('/add', function (req, res, next) {
  //console.log('devices-add: ', req.body);  
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //const user_id = 1;
  const user_id = req.user.id;
  const name = req.body.name;
  const device = {
    name: name,
    user_id: user_id
  }

  dbSession.transaction(function (t) {
    return Device.create(device, { transaction: t });
  }).then(function (result) {
    res.json({ 'id': result.id, 'name': result.name });
  }).catch(function (err) {
    console.log('devices-add name: ', err.name);
    console.log('devices-add rejected: ', err.errors);
    res.status(400).json({ message: err.errors[0].message });
  });
});

router.post('/set', function (req, res, next) {
  //console.log('devices-set: ', req.body);
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //const user_id = 1;
  const user_id = req.user.id;
  const id = req.body.id;
  const name = req.body.name;
  const device = {
    id: id,
    user_id: user_id
  }
  //device.id = Math.floor(Math.random() * (1000 - 4 + 1)) + 4;

  dbSession.transaction(function (t) {
    return Device.update({ name: name }, { where: device, transaction: t });
  }).then(function (result) {
    console.log('devices-set commeted: ', result);
    Device.findById(id).then(upDevice => {
      res.json({ 'id': upDevice.id, 'name': upDevice.name, 'latitude': upDevice.latitude, 'longitude': upDevice.longitude });
    }).catch(function (err) {
      let error = { id, message: 'Not found' }
      console.log('devices-set-find rejected: ', error);
      res.status(400).json(error);
    });
  }).catch(function (err) {
    let error = { id, message: err.errors[0].message }
    console.log('devices-set rejected: ', error);
    res.status(400).json(error);
  });
});

router.post('/remove', function (req, res, next) {
  //console.log('devices-remove: ', req.body.id);
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //const user_id = 1;
  const user_id = req.user.id;
  const id = req.body.id;
  dbSession.transaction(function (t) {
    return Device.destroy({
      where: {
        id: id,
        user_id: user_id
      }
    }, { transaction: t });
  }).then(function (result) {
    res.json({ 'id': id });
  }).catch(function (err) {
    console.log('devices-remove rejected: ', err.errors);
    res.status(400).json({ id,  message: err.errors[0].message });
  });
});

router.post('/pos', function (req, res, next) {
  //console.log('devices-pos: ', req.body);
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //const user_id = 1;
  const user_id = req.user.id;
  const id = req.body.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const device = {
    id: id,
    user_id: user_id
  }
  //device.id = Math.floor(Math.random() * (1000 - 4 + 1)) + 4;

  dbSession.transaction(function (t) {
    console.log('devices-pos device: ', device);
    return Device.update({
      latitude: latitude, longitude: longitude
    }, { where: device, transaction: t, fields: ['latitude', 'longitude'] });
  }).then(function (result) {
    console.log('devices-pos commeted: ', result);
    Device.findById(id).then(upDevice => {
      res.json({ 'id': upDevice.id, 'name': upDevice.name, 'latitude': upDevice.latitude, 'longitude': upDevice.longitude });
    }).catch(function (err) {
      console.log('devices-pos-find rejected: ', err);
      res.json(err);
    });
  }).catch(function (err) {
    console.log('devices-pos rejected: ', err.errors);
    res.status(400).json({ id, message: err.errors[0].message });
  });
});

module.exports = router;