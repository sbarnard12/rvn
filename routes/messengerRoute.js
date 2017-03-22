var express = require('express');
var router = express.Router();
var messengerAPI = require('../models/apis/messagesAPI');

    router.route('/')
	.get(function(req, res, next){
            messengerAPI.getUserList(req,res,next);
        	})
;
router.route('/:id')
	.get(function(req,res,next){
    		messengerAPI.getOneChatHistory(req,res, next);
    	})
;

module.exports = router;