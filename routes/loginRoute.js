var express = require('express');
var router = express.Router();

var loginAPI = require('../models/apis/loginAPI');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('landingPageView', {layout: false});
});

router.post('/', function(req, res, next){
	loginAPI.checkUser(req, res, next);
});

module.exports = router;
