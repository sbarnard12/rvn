var express = require('express');
var router = express.Router();

var loginAPI = require('../models/apis/loginAPI');


/* GET home page. */
router.route('/')
    .get(function(req, res, next) {
        res.render('landingPageView', {layout: false});
    })
    .post(function(req, res, next){
        loginAPI.checkUser(req, res);
    })
;

router.route('/logout')
    .get(function(req,res, next){
        loginAPI.logoutUser(req,res,next);
    })

;

module.exports = router;
