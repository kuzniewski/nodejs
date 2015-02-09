module.exports = function(app) {
	var mysql = require('mysql');
	var model = {};

	model.list = function(app, next)
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
			app.helpers.debug.msg(app, '[ UserModel ] '+query.sql);
		}
	};

	model.add = function(app, req, next) {
		var post  = {name:req.body.name, user:req.body.user, password:req.body.password};
		var query = app.get('conn').query('INSERT INTO user SET ?', post, function(err, result) {
		  if(err) {
		  	throw err;
		  } else {
		  	next(err, result);
		  }
		});
		if(app.get('_debug') == 1) {
			app.helpers.debug.msg(app, '[ UserModel ] '+query.sql);
		}
	};

	model.get = function(app, id, next) {
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
			app.helpers.debug.msg(app, '[ UserModel ] '+query.sql);
		}
	};

	model.del = function(app, id, next) {
		var query = app.get('conn').query('DELETE FROM user WHERE id = '+mysql.escape(id), function(err, result) {
			if (err) { 
				throw err;
				next(err, false);
			} else {
				next(err, result);
			}
		});
		if(app.get('_debug') == 1) {
			app.helpers.debug.msg(app, '[ UserModel ] '+query.sql);
		}
	};

	model.update = function(app, id, req, next) {
		var _name 		= req.body.name;
		var _user 		= req.body.user;
		var _password 	= req.body.password;
		var post 		= {name: _name};
		if(req.body.name != null && req.body.user != null) {
			post = {name: _name, user: _user};
		}
		if(req.body.name != null && req.body.password != null) {
			post = {name: _name, password: _password};
		}
		if(req.body.name != null && req.body.user != null && req.body.password != null) {
			post = {name: _name, user: _user, password: _password};	
		}
		if(req.body.name != null || req.body.user != null || req.body.password != null) { 
			var query = app.get('conn').query("UPDATE user SET ?", post, function(err, result) {
				if (err) { 
					throw err;
					next(err, false);
				} else {
					next(err, result);
				}
			});
			if(app.get('_debug') == 1) {
				app.helpers.debug.msg(app, '[ UserModel ] '+query.sql);
			}
		} else {
			next('', false);
		}
	};

	return model;

};