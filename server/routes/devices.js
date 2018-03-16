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
    console.log('devices-add rejected: ', err);
    res.json(err);
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
    console.log('devices-add rejected: ', err);
    res.json(err);
  });
});
router.post('/', function (req, res, next) {
  //console.log('devices req.body: ', req.body);
  let user_id = 1;
  if (req.isAuthenticated() && req.user) {
    user_id = req.user.id
  }

  Device.findAll({
    attributes: ['id', 'name'],
    where: { user_id: user_id }
  }).then(devices => {
    res.json(devices);
  })
});

export default router;
