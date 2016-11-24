var db = require('../dbs/loginDB'), 
loginModel = db.model('Userlogin');

var checkUser = function(req, res, next){
	loginModel.findOne({ userName: req.body.userName })
	.then(function(user) {
    	if (!user) {
    	  res.render('landingPageView', { error: 'Invalid email or password.' });
    	} else {
    	  if (req.body.password === user.password) {
    	    // sets a cookie with the user's info
    	   req.session.user = user;
    	   res.send('success');
    	} else {
        	res.render('landingPageView', { error: 'Invalid email or password.' });
      	}
    	}
  	});
};

var getUser = function(req, res, next){
    if(req.session && req.session.user){
        loginModel.findOne({userName: req.session.user.userName})
        .then(function(user){
            if(user){
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
            }
            next();
        });  
    } else {
        next();
    }
}

var newLogin = function(req, res, next){
    var login = new loginModel();
    login.userName = req.body.userName;
    login.password = req.body.password;
    login.saveAsync()
    .then(function(login){
        console.log("success")
    })
}


module.exports = {
	checkUser: checkUser,
    getUser: getUser,
    newLogin: newLogin
}