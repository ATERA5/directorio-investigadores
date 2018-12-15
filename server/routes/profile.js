var express = require('express');
var router = express.Router();

var db = require('../models/index');
var userModel = require('../models/user')(db.sequelize,db.Sequelize);
var studentModel = require('../models/student')(db.sequelize,db.Sequelize);
var researcherModel = require('../models/researcher')(db.sequelize,db.Sequelize);
var institutionModel = require('../models/institution')(db.sequelize,db.Sequelize);
var articleModel = require('../models/article')(db.sequelize, db.Sequelize);
var articleResearcherModel = require('../models/articleresearcher')(db.sequelize, db.Sequelize);
var campusModel = require('../models/campus')(db.sequelize,db.Sequelize);
var collegeModel = require('../models/college')(db.sequelize, db.Sequelize);

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

router.get('/articulo/:id/:user', function(req, res, next){

  var info_about_researchers = articleResearcherModel.findAll({
      where: {
          article_id: req.params.id
      }
  }).then(arti => researcherModel.findAll({
      where:{
        id: arti.researcher_id
      }
  }));

  var info_about_authors =  articleResearcherModel.findAll({
      where: {
          article_id: req.params.id
      }
  }).then(arti => researcherModel.findAll({
      where:{
        id: arti.researcher_id
      }
  })).then(researcher_info => userModel.findAll({
      where:{
        id: researcher_info.user_id
      }
  }));

  var info_about_author = articleResearcherModel.findOne({
      where: {
          article_id: req.params.id
      }
  }).then(arti => researcherModel.findOne({
      where:{
        id: arti.researcher_id
      }
  })).then(researcher_info => userModel.findOne({
      where:{
        id: researcher_info.user_id
      }
  }));

  var info_about_article = articleModel.findOne({
    where:{
      id: req.params.id
    }
  });

  Promise.all([info_about_researchers, info_about_authors,info_about_author, info_about_article]).then(function(values){
    var researchers = values[0];
    var authors = values[1];
    var user = values[2];
    var article = values[3];
    res.render('article-profile',{
      researchers:researchers,
      authors: authors,
      user: user,
      article: article,
      authorsLen: authors.length
    });
  })


});

router.get('/campus/:id/:user', function(req,res,next){
    campusModel.findOne({
        where: {
            id: req.params.id
        }
    }).then(campus => {
        res.render('campus-profile',{
            campus: campus
        });
    })
});

router.get('/colegio/:id/:user', function(req,res,next){
    collegeModel.findOne({
        where: {
            id: req.params.id
        }
    }).then(college => {
        res.render('college-profile',{
            college: college
        });
    })
});

module.exports = router;
