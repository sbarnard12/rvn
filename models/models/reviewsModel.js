
//Model for the Database reviews

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var reviewSchema = new Schema ({
	reviewer: {type: String},
	reviewedUser: {type: String},
	taskId: {type: String},
	rating: {type: Number},
	description: {type: String}

}); 

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
