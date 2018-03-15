import express from 'express';
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
import ssr from './ssr';

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


app.post('/a/devices/add', function (req, res, next) {
  console.log('devices-add req: ', req);
  res.json({ success: true, message: req });
});
app.post('/a/devices', function (req, res, next) {
  console.log('devices-add req: ', req);
  const devicesItems = [
    {
      id: 1,
      name: 'pc_device',
      default: true,
      title: 'My PC',
      description: 'To use Devices please sign up.',
    },
    {
      id: 2,
      name: 'iPod',
      title: 'My iPod',
      description: 'To use Devices please sign up.',
    },
    {
      id: 3,
      name: 'iPad',
      title: 'My iPad Mini',
      description: 'To use Devices please sign up.',
    }
  ];
  res.json({ success: true, message: devicesItems });
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function (req, res) {
  res.send("acess granted");
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/*', ssr);

var server = app.listen(3000, '127.0.0.1', () => {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
