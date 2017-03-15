
//Model for the Database taskList

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

//set the schema based on the database types
var TaskListSchema = new Schema({
	title: {type: String, required: true},
    taskType: {type: String, required: true},
    ageGroup: {type: String, required: true},
	category: {type: String, required: true},
	description: {type: String, required: true},
    location: {type: String},
	address: {
		streetNumber: {type: Number},
		streetName: {type: String},
		city: {type: String},
		province: {type: String},
		postalCode: {type: String},
	},
	poster: {
		id: {type: String, required: true},
		firstName: {type: String},
		lastName: {type: String},
		rating: {type: Number},
	},
	matchedUser: {
		id: {type: String},
		firstName: {type: String},
		lastName: {type: String},
		rating: {type: Number},
	},
	date: {type: Date, default: Date.now},
    fromDate: {type: Date},
    toDate: {type: Date},
    duration: {type: Number},
	expired: {type: Boolean},
	state: {type: String, required: true}

});

var TaskListModel = mongoose.model('Tasklist', TaskListSchema);

module.exports = TaskListModel;
