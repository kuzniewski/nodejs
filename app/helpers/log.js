module.exports = {
	msg: function(app, msg) {
		console.log("[ "+app.helpers.date.get()+" ] [ LOG ] "+msg);
		return "[ "+app.helpers.date.get()+" ] [ LOG ] "+msg;
	},

	server: function(app, msg) {
		console.log("[ "+app.helpers.date.get()+" ] "+msg);
		return "[ "+app.helpers.date.get()+" ] "+msg;
	}
};