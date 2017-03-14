
//Model for the Database users

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var loginSchema = new Schema ({
	test1: {type: String},
	test2: {type: String}
}); 

var Test = mongoose.model('Test', loginSchema);

module.exports = Test;
