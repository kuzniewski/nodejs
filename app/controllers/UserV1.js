module.exports = function(app) {
	var UserModel 	= app.models.UserV1;
	var controller = {};

	// GET LIST USERS
	controller.getlist = function(req, res, next) {
		UserModel.list(app, function(err, list) {
			if (!err && list !== false) {
				res.status(200).send(list);
			} else {
				res.status(404).send("Not Found");
			}
		});
	};

	// CREATE NEW USER
	controller.add = function(req, res, next) {
		var _name 		= req.body.name || null;
		var _user 		= req.body.user || null;
		var _password 	= req.body.password || null;

		if( _name != null && _user != null && _password != null ) {
			UserModel.add(app, req, function(err, result) {
				if (!err && result !== false) {
					res.status(201).send(result);
				} else {
					res.status(404).send("Not Found");
				}
			});
		} else {
			res.status(404).send("Not Found");
		}
	};

	// GET USER FOR ID
	controller.get = function(req, res, next) {
		var _id = req.params.id || null;
		if( _id != null ) {
			UserModel.get(app, _id, function(err, result) {
				if (!err && result !== false) {
					res.status(200).send(result);
				} else {
					res.status(404).send("Not Found");
				}
			});
		} else {
			res.status(404).send("Not Found");
		}
	};

	// DELETE USER FOR ID
	controller.delete = function(req, res, next) {
		var _id = req.params.id || null;
		if( _id != null ) {
			UserModel.del(app, _id, function(err, result) {
				if (!err && result !== false) {
					res.status(200).send(result);
				} else {
					res.status(404).send("Not Found");
				}
			});
		} else {
			res.status(404).send("Not Found");
		}
	};

	// UPDATE USER FOR ID
	controller.put = function(req, res, next) {
		var _id 		= req.params.id || null;
		var _name 		= req.body.name || null;
		var _user 		= req.body.user || null;
		var _password 	= req.body.password || null;

		if( _id != null ) {
			UserModel.update(app, _id, req, function(err, result) {
				if (!err && result !== false) {
					res.status(200).send(result);
				} else {
					res.status(404).send("Not Found");
				}
			});
		} else {
			res.status(404).send("Not Found");
		}
	};

	return controller;

};