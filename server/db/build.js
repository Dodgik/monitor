const dbSession = require('./dbSession');

const User = require('./models/users');
const usersFxs = require('./fixtures/users');

const Device = require('./models/devices');
const devicesFxs = require('./fixtures/devices');

//dbSession.dropTable('devices');
//Device.drop();
//dbSession.query("DROP TABLE [monitor].[dbo].[devices]");
User.sync({ force: true });

User.sync({ force: true }).then(() => {
    usersFxs.forEach(user => {
        User.create(user);
    });
});

Device.sync({ force: true }).then(() => {
  devicesFxs.forEach(device => {
    Device.create(device);
  });
});
