module.exports = {
	msg: function(msg) {
		var date = require('./dateHelper.js');
		console.log("[ "+date.get()+" ] [ LOG ] "+msg);
		return "[ "+date.get()+" ] [ LOG ] "+msg;
	},

	server: function(msg) {
		var date = require('./dateHelper.js');
		console.log("[ "+date.get()+" ] "+msg);
		return "[ "+date.get()+" ] "+msg;
	}
};