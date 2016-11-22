var express = require('express');
var router = express.Router();

//var db = require('../models/dbs/usersDB'), 
//userLoginModel = db.model('Users');

var userAPI = require('../models/apis/usersAPI');

router.get('/', function(req, res, next){
	userAPI.getAllUsers(req, res, next);
});

module.exports = router;
