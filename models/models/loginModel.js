
//Model for the Database users

//initialize mongoose ODM
var mongoose = require('mongoose');
//mongoose.createConnection('mongodb://localhost/users');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var loginSchema = new Schema ({
	userName: {type: String},
	password: {type: String}
}); 

var Login = mongoose.model('Userlogin', loginSchema);

module.exports = Login;
