var db5 = require('../dbs/reviewsDB'), 
reviewModel = db5.model('Review');

var db1 = require('../dbs/taskListDB'), 
taskListModel = db1.model('Tasklist');

var getAllReviews = function(req, res, next){
	reviewModel.find({})
	.then(function(reviews){
		res.send(reviews);
	})
}

var newReview = function(req, res, next){
	taskListModel.findOne({_id: req.params.id})
	.then(function(task){
		task.currentUser = req.session.user_id;
		res.render('reviewTaskView', {task: task, helpers: {if_eq: if_eq}});
	})
}

var submitReview = function(req, res, next){
	var review = new reviewModel();
	review.reviewer = req.session.user_id;
	review.reviewedUser = req.body.userID;
	review.rating = req.body.rating;
	review.description = req.body.description;
	review.taskId = req.params.id;

	review.saveAsync({})
		.then(function(review){
            taskListModel.findOne({_id: review.taskId})
				.then(function(task){
					task.state = "Complete";
					task.expired = true;
					task.saveAsync({})
						.then(function(task){
							res.send("success");
						})
						.catch(function(e){
							console.log("fail");
							res.json({'status': 'error', 'error': e});
						})
						.error(console.error);
				})

		})
        .catch(function(e){
            console.log("fail");
            res.json({'status': 'error', 'error': e});
        })
        .error(console.error);
	//set task state to completed
	//set task to expired 
}

var if_eq = function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};

module.exports = {
	getAllReviews: getAllReviews,
	newReview: newReview,
	submitReview: submitReview,
}
