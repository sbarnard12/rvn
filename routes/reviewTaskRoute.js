var express = require('express');
var router = express.Router();

var reviewsAPI = require('../models/apis/reviewsAPI');

router.route('/:id')
	.get(function(req, res, next){
		reviewsAPI.newReview(req, res, next);
	})
	.post(function(req, res, next){
		reviewsAPI.submitReview(req, res, next)
	})

module.exports = router;