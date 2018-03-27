var express = require('express');

var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

const Email = require('email-templates');
const nodemailer = require('nodemailer');
const mailer = require('../lib/mailer');
var async = require('async');
var crypto = require('crypto');
const bCrypt = require('bcrypt-nodejs');

const { publicFields, guestUser, loggedInUser } = require('../lib/user_helper');


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
/*
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
router.get('/', function (req, res, next) {
  console.log('-->user-get');
  var user = {
    displayName: 'Guest',
    loggedIn: req.isAuthenticated()
  };

  if (req.isAuthenticated() && req.user) {
    user.displayName = req.user.email.split('@')[0]
    res.json({ user: user });
  } else {
    res.json({ user: user });
  }
});

router.post('/login', function (req, res, next) {
  console.log('-->user-login');
  passport.authenticate('local-signInOrUp', function (err, user, info) {
    if (err) {
      console.error('-->login err: ', err);
      res.json({ success: false, message: err });
    } else if (user) {
      //console.log('login user: ', user);
      req.logIn(user, function (err) {
        if (err) {
          console.error('-->login user error: ', err);
          res.json({ success: false, message: err });
        } else {
          res.json({ success: true, user: user });
        }
      });
    } else if (!user) {
      return res.redirect('/user-not-faund');
    }
  })(req, res, next);
});

router.post('/forgot', function (req, res, next) {
  const email = req.body.email;
  console.log('-->forgot to email:', email);

  async.waterfall([
    function (done) {
      console.log('-->1');
      crypto.randomBytes(16, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      console.log('-->2 token:', token);
      User.findOne({
        attributes: publicFields,
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
    function (user, done) {
      console.log('-->3 sendEmail');
      mailer.sendEmail('forgot', user)
        .then(user => {
          console.log('-->3 email sent');
          done(null, user);
        }).catch(error => {
          console.log('-->3 sent email error:', error);
          done({ status: 500, message: 'Server error' });
        });
    }
  ], function (err) {
    console.log('last callback err:', err);
    if (err) {
      res.status(err.status).json({ message: err.message });
    } else {
      res.json({ message: 'Recovery email was sent' });
    }
  });
});


var generateHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

router.post('/reset', function (req, res, next) {
  const { password, passwordConfirm, token } = req.body;

  async.waterfall([
    function (done) {
      if (!password || password.length < 6) {
        done({ status: 400, message: 'Password must contain at least six characters!' });
      } else if (password != passwordConfirm) {
        done({ status: 400, message: 'Please check that you have entered and confirmed your password' });
      } else if (!token) {
        done({ status: 400, message: 'Invalid reset code' });
      }
      done(null, token, password);
    },
    function (token, password, done) {
      User.findOne({
        attributes: publicFields,
        where: { reset_code: token }
      })
      .then(user => {
        if (user) {
          done(null, user, password);
        } else {
          done({ status: 400, message: 'Invalid reset code' });
        }
      })
    },
    function (user, password, done) {
      if (password == user.email) {
        done({ status: 400, message: 'Password must be different from Username!' });
      } else {
        var userPassword = generateHash(password);
        user.password = userPassword;
        //user.reset_code = null;
        user.save().then(updatedUser => {
          user = user.get({ plain: true })
          done(null, user);
        }).catch(error => {
          done({ status: 500, message: 'Server error' });
        });
      }
    },
    function (user, done) {
      mailer.sendEmail('reset', user)
      .then(result => {
        done(null, user);
      }).catch(error => {
        console.log('-->reset sent email error:', error);
        done({ status: 500, message: 'Server error' });
      });
    }
  ], function (err, user) {
    if (err) {
      res.status(err.status).json({ message: err.message });
    } else {
      console.log('reset last callback user:', user);
      req.logIn(user, function (err) {
        err && console.error('-->reset login user error: ', err);

        let data = { message: 'Recovery email was sent' };
        if (req.isAuthenticated()) {
          data.user = loggedInUser(user);
        } else {
          data.user = guestUser(user);
        }
        res.json(data);
      });
    }
  });
});

module.exports = router;
