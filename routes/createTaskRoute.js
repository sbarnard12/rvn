var express = require('express');
var router = express.Router();

var tasks = require('../models/apis/taskListAPI');

router.get('/', function(req, res, next){
	res.render('createTaskView',{});
});

router.post('/', function(req, res, next){
	tasks.createNewTask(req, res, next);
});

router.route('/photo')
	.post(function(req, res, next){
		tasks.uploadPicture(req, res, next);
        //tasks.createNewTask(req, res, next);
	})
;
router.route('/file')
    .post(function(req, res, next){
        tasks.uploadFile(req, res, next);
    })

;

module.exports = router;