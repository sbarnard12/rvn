var db5 = require('../dbs/reviewsDB'), 
reviewModel = db5.model('Review');

var db1 = require('../dbs/taskListDB'), 
taskListModel = db1.model('Tasklist');

var db6 = require('../dbs/usersDB'),
    usersModel = db6.model('User');

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
	review.reviewer.id = req.session.user_id;
    review.reviewer.name = req.session.user_name;
	review.rating = req.body.rating;
	review.description = req.body.description;
	review.taskId = req.params.id;
    review.date = new Date(Date.now());

    usersModel.findOne({_id: req.body.userID})
        .then(function(user){
            review.reviewedUser.id = user._id;
            review.reviewedUser.name = user.firstName + " " + user.lastName;

            taskListModel.findOne({_id: review.taskId})
                .then(function(task){
                    //check if i'm the poster or the matched
                    if(task.poster.id == req.session.user_id){
                        //set poster to has Reviewed
                        task.poster.hasReviewed = true;
                    } else {
                        //set matched user to has reviewed
                        task.matchedUser.hasReviewed = true;
                    }
                    if(task.poster.hasReviewed && task.matchedUser.hasReviewed){
                        //if both users have submitted reviews, complete the task
                        task.state = "Complete";
                        task.expired = true;
                        task.completeDate = new Date(Date.now());
                    }
                    review.saveAsync({})
                        .then(function(review){
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
                        .catch(function(e){
                            console.log("fail");
                            res.json({'status': 'error', 'error': e});
                        })
                        .error(console.error);
                })
            //set task state to completed
            //set task to expired
        })


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
