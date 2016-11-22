var db3 = require('../dbs/userReviewsDB'), 
userReviewsModel = db3.model('Userreview');

var getAllReviews = function(req, res, next){
	userReviewsModel.find({})
	.then(function(allReviews){
		res.json(allReviews);
	});
}

module.exports = {
	getAllReviews: getAllReviews
}