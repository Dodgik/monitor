const dbSession = require('./dbSession');
const User = require('./models/users');
const usersFxs = require('./fixtures/users');

User.sync({ force: true }).then(() => {
    usersFxs.forEach(user => {
        User.create(user);
    });
});
