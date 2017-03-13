
//Model for the Messages db

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var messagesSchema = new Schema ({
	user1: {
		id: {type: String, required: true},
		name: {type: String, required: true} 
	},
	user2: {
		id: {type: String, required: true},
		name: {type: String, required: true},
	},
	message: {type: String, required: true},
	created: {type: Date, default: Date.now}
});

var Messages = mongoose.model('Message', messagesSchema);

module.exports = Messages;
