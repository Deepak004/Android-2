
var express = require('express'),
    path    = require('path'),
    http    = require('http'),
    cors    = require('cors'),
    route   = require('./routes.js');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 4000);
  app.use(express.compress());
  app.use(cors());
  app.use(express.logger('tiny')); // 'default', 'short', 'tiny', 'dev'
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, '../www')));
});

app.get('/user/add/:user/:domain', route.addUser);
app.get('/user/data/:user/:domain', route.getUserData);

app.get('/user/verification/:code', route.verifyUserEmail);
app.get('/user/resend/:user/:domain', route.resendVerifyEmail);
app.get('/user/verified/:user/:domain', route.getVerificationStatus);

app.get('/user/score/:user/:domain/:x/:y', route.addUserScore);
app.get('/domain/data/:domain', route.getDomainData);

app.post('/invites', route.inviteUsers);


http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});