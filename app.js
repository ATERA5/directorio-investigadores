var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator')
var bodyParser = require('body-parser')
require('dotenv').load();

var indexRouter = require('./server/routes/index');
var authRouter = require('./server/routes/auth');
var searchRouter = require('./server/routes/search');
var profileRouter = require('./server/routes/profile');
var usersRouter = require('./server/routes/users');
var campusRouter = require('./server/routes/campus');
var statesRouter = require('./server/routes/states');
var countriesRouter = require('./server/routes/countries');
var institutionsRouter = require('./server/routes/institutions');
var articleRouter = require('./server/routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));
app.use('/popper', express.static(path.join(__dirname, '/node_modules/popper.js/dist/')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'pKmB1pAATDep',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.reqUser = req.user;
  next();
});

app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/busqueda', searchRouter);
app.use('/perfil', profileRouter);
app.use('/usuarios', usersRouter);
app.use('/campus', campusRouter);
app.use('/estados', statesRouter);
app.use('/paises', countriesRouter);
app.use('/instituciones', institutionsRouter);
app.use('/articulos', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
