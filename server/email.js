var Promise   = require("es6-promise").Promise,
    templates = require("email-templates"),
    config    = require("./server_config/config");

exports.sendVerifyMail = function (context) {
  return new Promise (function (onReolved, onRejected) {
    templates(__dirname + '/email-templates/', function(err, template) {
      if (err) onRejected(err);

      context.path = config.path;

      template('verify', context, function(err, html, text) {
        if (err) onRejected();
        config.verifyTransport.sendMail({
          from: config.email.verify.from,
          to: config.email.test_user.user,
          subject: 'Please Verify Your Email Address',
          html: html,
          text: text
        }, function(err, responseStatus) {
          if (err) onRejected(err);
          onReolved();
        });
      });
    });
  });
};

exports.sendInviteMails = function (context) {
  return new Promise (function (onReolved, onRejected) {
    templates(__dirname + '/email-templates/', function(err, template) {
      if (err) onRejected(err);

      template('invite', context, function(err, html, text) {
        if (err) onRejected();
        config.welcomeTransport.sendMail({
          from: config.email.welcome.from,
          to: config.email.test_user.user,
          subject: 'You\'ve Been Invited to Try Happy Meter',
          html: html,
          text: text
        }, function(err, responseStatus) {
          if (err) onRejected(err);
          onReolved();
        });
      });
    });
  });
};