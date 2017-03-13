var express = require('express');
var router = express.Router();
var messengerAPI = require('../models/apis/messagesAPI');

router.route('/')
	.get(function(req, res, next){
		messengerAPI.getAllConversations(req, res, next);
	})
;


module.exports = router;
