var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('../models/index');
var User = require('../models/user')(db.sequelize,db.Sequelize);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(user => {
        done(null, user);
    });
});


module.exports = router;
