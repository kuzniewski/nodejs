var debug = require('../libs/debugHelper.js');
var mysql = require('mysql');

module.exports = {

	list: function(app, next)
	{
		var query = app.get('conn').query('SELECT * FROM user', function(err, rows, fields) {
			if (err) { 
				throw err;
				next(err, false);
			} else {
				if(rows != "") {
					var list = {};
					for (i = 0; i < rows.length; i++) {
				        list[i] = {id: rows[i].id, name: rows[i].name, user: rows[i].user};
				    }
				    next(err, list);
				} else {
					next(err, false);
				}
			}
		});
		if(app.get('_debug') == 1) {
			debug.msg('[ UserModel ] '+query.sql);
		}
	},

	add: function(app, req, next) {
		var post  = {name: mysql.escape(req.body.name), user: mysql.escape(req.body.user), password: mysql.escape(req.body.password)};
		var query = app.get('conn').query('INSERT INTO user SET ?', post, function(err, result) {
		  if(err) {
		  	throw err;
		  } else {
		  	next(err, result);
		  }
		});
		if(app.get('_debug') == 1) {
			debug.msg('[ UserModel ] '+query.sql);
		}
	},

	get: function(app, id, next) {
		var query = app.get('conn').query('SELECT * FROM user WHERE id = '+mysql.escape(id), function(err, rows, fields) {
			if (err) { 
				throw err;
				next(err, false);
			} else {
				if(rows != "") {
					var list = {};
					for (i = 0; i < rows.length; i++) {
				        list[i] = {id: rows[i].id, name: rows[i].name, user: rows[i].user};
				    }
				    next(err, list);
				} else {
					next(err, false);
				}
			}
		});
		if(app.get('_debug') == 1) {
			debug.msg('[ UserModel ] '+query.sql);
		}
	}, 

	del: function(app, id, next) {
		var query = app.get('conn').query('DELETE FROM user WHERE id = '+mysql.escape(id), function(err, result) {
			if (err) { 
				throw err;
				next(err, false);
			} else {
				next(err, result);
			}
		});
		if(app.get('_debug') == 1) {
			debug.msg('[ UserModel ] '+query.sql);
		}
	},

	update: function(app, id, req, next) {
		var _name 		= mysql.escape(req.body.name);
		var _user 		= mysql.escape(req.body.user);
		var _password 	= mysql.escape(req.body.password);
		var post 		= {name: _name, user: _user};
		if(_password) {
			post = {name: _name, user: _user, password: _password};
		}
		var query = app.get('conn').query("UPDATE user SET ?", post, function(err, result) {
			if (err) { 
				throw err;
				next(err, false);
			} else {
				next(err, result);
			}
		});
		if(app.get('_debug') == 1) {
			debug.msg('[ UserModel ] '+query.sql);
		}
	}

};