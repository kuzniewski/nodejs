module.exports = {
	msg: function(app, msg) {
		console.log("[ "+app.helpers.date.get()+" ] [ DEBUG ] "+msg);
		return "[ "+app.helpers.date.get()+" ] [ DEBUG ] "+msg;
	}
};