var express = require('express');
var path = require('path');
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

const Email = require('email-templates');
const nodemailer = require('nodemailer');

const mailer = require('../lib/mailer');

var async = require('async');
var crypto = require('crypto');

var ssr = require('./ssr');

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

var devices = require('./devices');
app.use('/a/devices', devices);

var userRouter = require('./user');
app.use('/a/user', userRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/logout', function (req, res) {
  //console.log('logging out');
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function (req, res) {
  res.send("acess granted");
});

//app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

console.log('__dirname=', __dirname);
console.log('path=', path.join(__dirname, 'public'));
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ssr);

var server = app.listen(3000, '127.0.0.1', () => {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
