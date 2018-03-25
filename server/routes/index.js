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

var devices = require('./devices');
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

app.use('/a/devices', devices);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/login', function (req, res, next) {
  passport.authenticate('local-signInOrUp', function (err, user, info) {
    if (err) {
      //console.log('login err: ', err);
      if (req.xhr) {
        //console.log('login is xhr');
        res.json({ success: false, message: err });
      } else {
        //console.log('login is not xhr');
        return next(err);
      }
    } else if (user) {
      //console.log('login user: ', user);
      req.logIn(user, function (err) {
        if (err) {
          //console.log('login user error: ', err);
          if (req.xhr) {
            res.json({ success: false, message: err });
          } else {
            return next(err);
          }
        } else {
          if (req.xhr) {
            //console.log('login user is xhr');
            res.json({ success: true });
          } else {
            //console.log('login user is not xhr');
            return res.redirect('/');
          }
        }
      });
    } else if (user) {
      return res.redirect('/user-not-faund');
    }
  })(req, res, next);
});

app.get('/logout', function (req, res) {
  //console.log('logging out');
  req.logout();
  res.redirect('/');
});

app.post('/forgot', function (req, res, next) {
  const email = req.body.email;
  console.log('forgot to email:', email);

  async.waterfall([
    function(done) {
      console.log('-->1');
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      console.log('-->2 token:', token);
      User.findOne({
        attributes: ['id', 'email'],
        where: { email: email }
      })
      .then(user => {
        if (user) {
          user.reset_code = token;
          user.save().then(user => {
            console.log('-->2 user token saved');
            done(null, user);
          }).catch(error => {
            console.log('-->2 user token catch:', error);
            done({ status: 500, message: 'Server error' });
          });
        } else {
          done({ status: 400, message: 'User not found' });
        }
      })
    },
    function(user, done) {
      console.log('-->3 sendEmail');
      mailer.sendEmail('forgot', user)
      .then(user => {
        console.log('-->3 email sent');
        done(null, user);
      }).catch(error => {
        console.log('-->3 sent email error:', error);
        done({ status: 500, message: 'Server error' });
      });
      done(null, 'done')
    }
  ], function(err) {
    console.log('last callback err:', err);
    if (err) {
      res.status(err.status).json({ message: err.message });
    }
  });
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

app.use('/*', ssr);

var server = app.listen(3000, '127.0.0.1', () => {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
