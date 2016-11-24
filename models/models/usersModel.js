
//Model for the Database users

//initialize mongoose ODM
var mongoose = require('mongoose');
//mongoose.createConnection('mongodb://localhost/users');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var usersSchema = new Schema ({
	title: {type: Number},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	gender: {type: Number, required: true},
	birthDate: {type: Date, required: true},
	email: {type: String},
	contactNumber: {type: Number},
	preferredContact: {type: Number, required: true},
	userLoginID: {type: String, required: true},
	rating: {type: Number},
	address: {
		streetNumber: {type: Number},
		streetName: {type: String},
		city: {type: String},
		province: {type: String},
		postalCode: {type: String},
	}
}); 

var Users = mongoose.model('User', usersSchema);

module.exports = Users;
