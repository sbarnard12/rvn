
//Model for the Database reviews

//initialize mongoose ODM
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var reviewSchema = new Schema ({
	reviewer: {
        id: {type: String},
        name: {type: String}
    },
	reviewedUser: {
        id: {type: String},
        name: {type: String}
    },
	taskId: {type: String},
	rating: {type: Number},
	description: {type: String},
    date: {type: Date}
}); 

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
