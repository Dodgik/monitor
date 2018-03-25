const dbSession = require('./dbSession');

const User = require('./models/users');
const usersFxs = require('./fixtures/users');

const Device = require('./models/devices');
const devicesFxs = require('./fixtures/devices');

var models = [
    'User',
    'Device',
];

//dbSession.dropTable('devices');
//Device.drop();
//dbSession.query("DROP TABLE [monitor].[dbo].[devices]");

dbSession.query('DROP TABLE [dbo].[devices]')
    .then(function() {
        console.log('--->DROP TABLE users');
        return dbSession.query('DROP TABLE [dbo].[users]')
    })
    .then(function() {
        console.log('Database synchronised.');
    }, function(err) {
        console.log('----------------------> err:');
        console.log(err);
    });

/*
dbSession.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(function() {
      return dbSession.sync({ force: true });
  })
  .then(function() {
      return dbSession.query('SET FOREIGN_KEY_CHECKS = 1')
  })
  .then(function() {
      console.log('Database synchronised.');
  }, function(err) {
      console.log('----------------------> err:');
      console.log(err);
    });
*/

/*
Device.sync({ force: true });
User.sync({ force: true });
*/

User.sync({ force: false }).then(() => {
    usersFxs.forEach(user => {
        User.create(user);
    });
});

Device.sync({ force: false }).then(() => {
  devicesFxs.forEach(device => {
    Device.create(device);
  });
});
