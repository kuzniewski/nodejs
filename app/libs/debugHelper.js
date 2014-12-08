module.exports = {
	msg: function(msg) {
		var date = require('./dateHelper.js');
		console.log("[ "+date.get()+" ] [ DEBUG ] "+msg);
		return "[ "+date.get()+" ] [ DEBUG ] "+msg;
	},

	msgX: function(msg) {
		var date = require('./dateHelper.js');
		console.log("[ "+date.get()+" ] [ DEBUG ] "+msg);
		return "[ "+date.get()+" ] [ DEBUG ] "+msg;
	}
};