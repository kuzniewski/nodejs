module.exports = function(app) {

	var userControllerV1 = app.controllers.v1.User;

	app.route('/api/v1/user')
		.get(userControllerV1.getlist);

	app.route('/api/v1/user/add')
		.post(userControllerV1.add); 

	app.route('/api/v1/user/:id')
		.get(userControllerV1.get)
		.delete(userControllerV1.delete) 
		.put(userControllerV1.put);

}