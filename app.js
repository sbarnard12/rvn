var express = require('express');
//handlebars html editor
var exphbs = require('express-handlebars');
//sass css editor
var sassMiddleware = require('node-sass-middleware');
//browserify - javascript something or other
//var browserify = require('browserify-middleware');
//mongoose ODM to connect to a mongoDB database
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/todos');
var session = require('client-sessions');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//models
require('./models/models/taskListModel');
require('./models/models/loginModel');
require('./models/models/userReviewsModel');
require('./models/models/usersModel');

//routes
var login = require('./routes/loginRoute');
var newUser = require('./routes/newUserRoute');
var taskList = require('./routes/taskListRoute');
var home = require('./routes/homeRoute');
var details = require('./routes/taskDetailRoute');
var createTask = require('./routes/createTaskRoute');
var thankyou = require('./routes/thankyouRoute');
var userProfile = require('./routes/userProfileRoute');
var userTaskHistory = require('./routes/userTaskHistoryRoute');
var userCurrentTask = require('./routes/userCurrentTasksRoute');
var userReviews = require('./routes/userReviewsRoute');

var app = express();

// view engine setup
	//Jade view engine
	//app.set('views', path.join(__dirname, 'views'));
	//app.set('view engine', 'jade');
 app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
 app.set('view engine', 'hbs');
 app.use (
   sassMiddleware({
     src: __dirname + '/sass',
     dest: __dirname + '/public',
     // prefix: '/stylesheets',
     debug: true,
   })
 );
//browserify.settings({transform: ['hbsfy']});
//app.get('/javascripts/bundle.js', browserify('./client/script.js'));

if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var config = {
    files: ["public/**/*.{js,css}", "client/*.js", "sass/**/*.scss", "views/**/*.hbs"],
    logLevel: 'debug',
    logSnippet: false,
    reloadDelay: 3000,
    reloadOnRestart: true
  };
  var bs = browserSync(config);
  app.use(require('connect-browser-sync')(bs));
}
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

var loginAPI = require('./models/apis/loginAPI');
app.use(function(req, res, next){
    loginAPI.getUser(req, res, next)
})
function requireLogin(req, res, next){
  if (req.user || req.path ==='/login' || req.path ==='/signup' || req.path === '/thankyou') {
    next();
  } else {
    res.redirect('/login');
  }
};



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap-sass/assets/fonts')));
app.use(requireLogin);

app.use('/', login);
app.use('/user', userProfile);
app.use('/login', login);
app.use('/signup', newUser);
app.use('/taskList', taskList);
app.use('/home', home);
app.use('/taskdetails', details);
app.use('/createTask', createTask);
app.use('/thankyou', thankyou);
app.use('/user/profile', userProfile);
app.use('/user/reviews', userReviews);
app.use('/user/taskhistory', userTaskHistory);
app.use('/user/currenttasks', userCurrentTask);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
