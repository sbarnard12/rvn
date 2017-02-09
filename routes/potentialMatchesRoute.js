var express = require('express');
var router = express.Router();

var potentialMatchesAPI = require('../models/apis/potentialMatchesAPI');


router.route('/:id')
    .get(function(req,res,next){
        potentialMatchesAPI.getAllInterested(req, res,next);
    })
;
module.exports = router;