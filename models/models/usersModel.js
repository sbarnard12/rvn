
//Model for the Database users

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var usersSchema = new Schema ({
	title: {type: String},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
    age: {type: Number, required: true},
	gender: {type: Number, required: true},
	birthDate: {type: Date, required: true},
	email: {type: String},
	contactNumber: {type: Number},
	preferredContact: {type: String, required: true},
	userLoginID: {type: String, required: true},
	rating: {type: Number},
	address: {
		streetAddress: {type: String},
		city: {type: String},
		province: {type: String},
		postalCode: {type: String},
	},
    hobbies: [String],
    interests: [String]
}); 

var Users = mongoose.model('User', usersSchema);

module.exports = Users;
