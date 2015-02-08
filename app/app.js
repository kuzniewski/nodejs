var express     = require('express');
var load    	= require('express-load');
var bodyParser  = require("body-parser");
var fs 			= require('fs');
var ejs 		= require('ejs');
var mysql       = require('mysql');
var app    		= express();

// read settings file / parse to json retun file / set var config in app
app.set('config', JSON.parse(fs.readFileSync( __dirname + '/config/settings.json')));

// read database config file / parse to json return file
var db          = JSON.parse(fs.readFileSync( __dirname + '/config/database.json'));
// create base connection to mysql
var conn        = mysql.createConnection({
                    host     : db.host,
                    user     : db.user,
                    password : db.password,
                    database : db.database
                });
// set var conn in app
app.set('conn', conn);

// set property for app
var PORT        = process.env.PORT || app.get('config').port;
var ENV         = process.env.NODE_ENV || "development";
app.set('env', ENV);

// set var log and debug for app
app.set('_debug', app.get('config').debug);
app.set('_log', app.get('config').log);

var msgServer   = "";
if ('development' == app.get('env')) {
  msgServer = 'server is listen on port '+app.get('config').port+' in development mode / LOG['+((app.get('config').log == 1) ? "ON" : "OFF")+'] DEBUG['+((app.get('config').debug == 1) ? "ON" : "OFF")+']';
}

if ('production' == app.get('env')) {
  msgServer = 'server is listen on port '+app.get('config').port+' in production mode / LOG['+((app.get('config').log == 1) ? "ON" : "OFF")+'] DEBUG['+((app.get('config').debug == 1) ? "ON" : "OFF")+']';
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

/* Setup static page delivery */
app.use( express.static( __dirname + '/public' ) ); // This is the client side!

// dynamically include routes / controllers / helpers / models
load('helpers')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    res.status(404).send("Not Found");
});

// LISTEN SERVER
app.listen(PORT);
app.helpers.log.server(app, 'RUNNING v'+app.get('config').version+' - '+app.get('config').versionDate+' [ '+msgServer+' ]');