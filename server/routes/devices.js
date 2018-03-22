import express from 'express';

var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

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
  console.log('devices req.body: ', req.body);
  let user_id = 1;
  if (req.isAuthenticated() && req.user) {
    user_id = req.user.id
  }

  Device.findAll({
    attributes: ['id', 'name', 'latitude', 'longitude'],
    where: { user_id: user_id }
  }).then(devices => {
    res.json(devices);
  })
});

router.post('/add', function (req, res, next) {
  //console.log('devices-add: ', req.body);
  let user_id = 1;
  if (req.isAuthenticated() && req.user) {
    user_id = req.user.id
  }
  const name = req.body.name;
  const device = {
    name: name,
    user_id: user_id
  }
  //device.id = Math.floor(Math.random() * (1000 - 4 + 1)) + 4;

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
  console.log('devices-set: ', req.body);
  let user_id = 1;
  if (req.isAuthenticated() && req.user) {
    user_id = req.user.id
  }
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
      console.log('devices-set-find rejected: ', err);
      res.json(err);
    });
  }).catch(function (err) {
    let error = { id, message: err.errors[0].message }
    console.log('devices-set rejected: ', error);
    res.status(400).json(error);
  });
});

router.post('/remove', function (req, res, next) {
  //console.log('devices-remove: ', req.body.id);
  //res.json({ id: req.body.id });
  let user_id = 1;
  if (req.isAuthenticated() && req.user) {
    user_id = req.user.id
  }
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
  let user_id = 1;
  if (req.isAuthenticated() && req.user) {
    user_id = req.user.id
  }
  const id = req.body.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const device = {
    id: id,
    user_id: user_id
  }
  //device.id = Math.floor(Math.random() * (1000 - 4 + 1)) + 4;

  dbSession.transaction(function (t) {
    return Device.update({
      latitude: latitude, longitude: longitude
    }, { where: device, transaction: t });
  }).then(function (result) {
    console.log('devices-set commeted: ', result);
    Device.findById(id).then(upDevice => {
      res.json({ 'id': upDevice.id, 'name': upDevice.name, 'latitude': upDevice.latitude, 'longitude': upDevice.longitude });
    }).catch(function (err) {
      console.log('devices-set-find rejected: ', err);
      res.json(err);
    });
  }).catch(function (err) {
    console.log('devices-pos rejected: ', err.errors);
    res.status(400).json({ id, message: err.errors[0].message });
  });
});

export default router;
