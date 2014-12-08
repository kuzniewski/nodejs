var express 	= require('express');
var bodyParser 	= require("body-parser");
var fs 			= require('fs');
var ejs 		= require('ejs');
var mysql       = require('mysql');

var app 		= express();

// read settings file
var data 		= fs.readFileSync( __dirname + '/config/settings.json');
// parse to json retun file
var config 		= JSON.parse(data);
// set var config in app
app.set('config', config);

// read database config file
var dataDB      = fs.readFileSync( __dirname + '/config/database.json');
// parse to json return file
var db          = JSON.parse(dataDB);
// create base connection to mysql
var conn        = mysql.createConnection({
                    host     : db.host,
                    user     : db.user,
                    password : db.password,
                    database : db.database
                });
// set var conn in app
app.set('conn', conn);

// load debug/log helper
var debug		= require(__dirname + '/libs/debugHelper.js');
var log			= require(__dirname + '/libs/logHelper.js');

// set property for app
var PORT        = process.env.PORT || app.get('config').port;
var ENV         = process.env.NODE_ENV || "developement";
app.set('env', ENV);

var msgServer   = "";
if ('development' == app.get('env')) {
  msgServer = 'server is listen on port '+app.get('config').port+' in development mode';
  app.set('_debug', 1);
  app.set('_log', 1);
}

if ('production' == app.get('env')) {
  msgServer = 'server is listen on port '+app.get('config').port+' in production mode';
  app.set('_debug', 0);
  app.set('_log', 1);
}

// disable header express
app.disable('x-powered-by');

// set view engine ejs
app.set('view engine', 'ejs');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

// to support JSON-encoded bodies
app.use(bodyParser.json()); 

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

// dynamically include routes (Controller)
var router = express.Router();
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      	route = require('./controllers/' + file);
      	route.controller(app);
  }
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    res.status(404).send("Not Found");
});

// LISTEN SERVER
app.listen(PORT);
log.server('RUNNING v'+app.get('config').version+' - '+app.get('config').versionDate+' [ '+msgServer+' ]');