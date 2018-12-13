var express = require('express');
var router = express.Router();

var db = require('../models/index');
var userModel = require('../models/user')(db.sequelize,db.Sequelize);
var studentModel = require('../models/student')(db.sequelize,db.Sequelize);
var researcherModel = require('../models/researcher')(db.sequelize,db.Sequelize);
var institutionModel = require('../models/institution')(db.sequelize,db.Sequelize);

function userIsStudent(user) {
    return studentModel.findOne({
        where: {
            user_id: user.id,
        }
    }).then((found) => {
        return found != null;
    });
}
function userIsResearcher(user) {
    return researcherModel.findOne({
        where: {
            user_id: user.id,
        }
    }).then((found) => {
        return found != null;
    });
}

function userRole(user) {
    if (userIsStudent(user))
        return 'Student';
    else if (userIsResearcher(user))
        return 'Researcher';
}

router.get('/usuario/:id/:user',function(req,res,next){
    userModel.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (!user){
            res.redirect('/');
        } else {
            var isOwner = req.isAuthenticated() ? req.params.id == req.user.id : false;
            res.render('profile',{
                isOwner: isOwner,
                user: user,
                role: userRole(user),
            })
        }
    })

});

router.get('/institucion/:id/:user', function(req,res,next){
    institutionModel.findOne({
        where: {
            id: req.params.id
        }
    }).then(institution => {
        res.render('institution-profile',{
            institution: institution
        });
    })
});

module.exports = router;
