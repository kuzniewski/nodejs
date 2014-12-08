var debug 		= require('../libs/debugHelper.js');
var UserModel 	= require('../models/UserModel.js');

UserController = function (app) {

	// GET LIST USERS
	app.get('/api/v1/user', function(req, res, next) {
		UserModel.list(app, function(err, list) {
			if (!err) {
				res.status(200).send(list);
			} else {
				res.status(404).send("Not Found");
			}
		});
	});

	// CREATE NEW USER
	app.post('/api/v1/user/add', function(req, res, next) {
		UserModel.add(app, req, function(err, result) {
			if (!err) {
				res.status(201).send(result);
			} else {
				res.status(404).send("Not Found");
			}
		});
	});

	// GET USER FOR ID
	app.get('/api/v1/user/:id', function(req, res, next) {
		var _id = req.params.id;
		UserModel.get(app, _id, function(err, result) {
			if (!err) {
				res.status(200).send(result);
			} else {
				res.status(404).send("Not Found");
			}
		});
	});

	// DELETE USER FOR ID
	app.delete('/api/v1/user/:id', function(req, res, next) {
		var _id = req.params.id;
		UserModel.del(app, _id, function(err, result) {
			if (!err) {
				res.status(200).send(result);
			} else {
				res.status(404).send("Not Found");
			}
		});
	});

	// UPDATE USER FOR ID
	app.put('/api/v1/user/:id', function(req, res, next) {
		var _id = req.params.id;
		UserModel.update(app, _id, req, function(err, result) {
			if (!err) {
				res.status(200).send(result);
			} else {
				res.status(404).send("Not Found");
			}
		});
	});

};

module.exports.controller = UserController;	