var express = require('express');
var router = express.Router();

var tasks = require('../models/apis/taskListAPI');

router.get('/', function(req, res){
    tasks.getHome(req,res);
	//res.render('homeView',{});
});

module.exports = router;