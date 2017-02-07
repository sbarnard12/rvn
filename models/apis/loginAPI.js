var db = require('../dbs/loginDB'), 
loginModel = db.model('Userlogin');

var db4 = require('../dbs/usersDB'), 
usersModel = db4.model('User');

var checkUser = function(req, res, next){
    loginModel.findOne({ userName: req.body.userName })
        .then(function(userLogin) {
            if(!userLogin){
                res.render('landingPageView', { error: 'Invalid email or password.' });
            } else {
                usersModel.findOne({userLoginID: userLogin._id})
                    .then(function(userModel){
                        if (req.body.password === userLogin.password) {
                            // sets a cookie with the user's info
                            req.session.user = userLogin;
                            req.session.user_id = userModel._id;

                            res.send('success');
                        } else {
                            res.render('landingPageView', { error: 'Invalid email or password.' });
                        }
                    })
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

var logoutUser = function(req, res, next){
    req.session.destroy();
    res.render('landingPageView', {layout: false});
}


module.exports = {
	checkUser: checkUser,
    getUser: getUser,
    newLogin: newLogin,
    logoutUser: logoutUser
}