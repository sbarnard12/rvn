var express = require('express');
var router = express.Router();

var potentialMatchesAPI = require('../models/apis/potentialMatchesAPI');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('matchPageView');
    //potentialMatchesAPI.setInterested(req,res,next);
});

module.exports = router;
