var express = require('express');
var router = express.Router();

var potentialMatchesAPI = require('../models/apis/potentialMatchesAPI');
var taskListApi = require('../models/apis/taskListAPI');


router.route('/:id')
    .get(function(req,res,next){
        potentialMatchesAPI.getAllInterested(req, res,next);
    })
;

router.route("/")
    .post(function(req, res, next){
        taskListApi.setMatched(req, res, next);
    })
;
module.exports = router;