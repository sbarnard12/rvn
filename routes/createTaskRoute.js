var express = require('express');
var router = express.Router();

var tasks = require('../models/apis/taskListAPI');

router.get('/', function(req, res, next){
	res.render('createTaskView',{user:req.session.user_name , helpers: {if_eq: if_eq}});
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

var if_eq = function(a, b, opts) {
//send this file into the view, in order to be able to use if clauses in the view file
if(a == b) // Or === depending on your needs
    return opts.fn(this);
else
    return opts.inverse(this);
};


module.exports = router;