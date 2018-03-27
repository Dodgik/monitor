const Email = require('email-templates');
const nodemailer = require('nodemailer');

const config = require('../config/config.js');


const sendEmail = function(template, user) {
  //console.log('forgot tpls:', tpls);

  const tplsPath = 'templates/emails';

  const email = new Email({
    views: { root: tplsPath },
    message: { from: config.mail_sender },
    // uncomment below to send emails in development/test env:
    open: false,
    send: true,
    transport: nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.mail_user,
        pass: config.mail_password
      }
    }),
    juiceResources: {
      webResources: {
        relativeTo: tplsPath
      }
    }
  });

  let recoveryUrl = `${config.protocol}://${config.host}/reset/${user.reset_code}`;
  const locals = {
      email: user.email,
      reset_code: user.reset_code,
      name: 'user',
      recoveryUrl: recoveryUrl,
  };


  return email
    .send({
      template: template,
      message: {
        to: user.email
      },
      locals: locals
    })
    /*
    .then(console.log)
    .catch(console.error);
    */
};

module.exports.sendEmail = sendEmail
