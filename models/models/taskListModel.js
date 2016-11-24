
//Model for the Database taskList

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

//set the schema based on the database types
var TaskListSchema = new Schema({
	title: {type: String, required: true},
	category: {type: Number, required: true},
	requesting: {type: String, required: true},
	offering: {type: String, required: true},
	description: {type: String, required: true},
	usePosterAddress: {type: Boolean, required: true},
	address: {
		streetNumber: {type: Number},
		streetName: {type: String},
		city: {type: String},
		province: {type: String},
		postalCode: {type: String},
	},
	modeofContact: {type: Number, required: true},
	pictureUrl: {type: String},
	poster: {
		id: {type: Schema.Types.ObjectId, required: true},
		firstName: {type: String},
		lastName: {type: String},
	},
	matchedUserID: {type: Schema.Types.ObjectId},
	date: {type: Date, default: Date.now},
	daterange: {type: Date},
	expired: {type: Boolean},
	state: {type: String, required: true}

});

var TaskListModel = mongoose.model('Tasklist', TaskListSchema);

module.exports = TaskListModel;
