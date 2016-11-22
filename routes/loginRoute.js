var express = require('express');
var router = express.Router();

var db = require('../models/dbs/loginDB'), 
loginModel = db.model('Userlogin');

/* GET home page. */
router.get('/', function(req, res, next) {
  loginModel.find({})
  .then(function(logins){
  	res.json(logins);
  })
});

module.exports = router;
