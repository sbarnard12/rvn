
//Model for the Database userReviews

//initialize mongoose ODM
var mongoose = require('mongoose');
//mongoose.createConnection('mongodb://localhost/userReviews');
var Schema = mongoose.Schema;
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var UserReviewsSchema = new Schema({
	reviewer: {type: Schema.Types.ObjectId, required: true},
	reviewee: {type: Schema.Types.ObjectId, required: true},
	rating: {type: Number, required: true},
	description: {type: String, required: true},
	private: {type: Boolean, required: true}

});

var UserReviews = mongoose.model("Userreview", UserReviewsSchema);

module.exports = UserReviews;
/* 
				{reviewer: {$type: "objectId"}},
				{reviewee: {$type: "objectId"}},
				{rating: {$type: "int"}},
				{description: {$type: "string"}}

*/