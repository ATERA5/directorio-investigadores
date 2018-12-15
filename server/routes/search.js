var express = require('express');
var router = express.Router();
var db =  require('../models/index');
const Op = db.Sequelize.Op;
var userModel = require('../models/user')(db.sequelize,db.Sequelize);
var institutionModel = require('../models/institution')(db.sequelize,db.Sequelize);
var articleModel = require('../models/article')(db.sequelize,db.Sequelize);
var campusModel = require('../models/campus')(db.sequelize,db.Sequelize);
var collegeModel = require('../models/college')(db.sequelize,db.Sequelize);

router.all('',function(req,res,next){
    res.redirect('/busqueda/avanzada')
});

router.all('/busquedarapida',function(req,res,next){
    res.redirect('/');
});

router.get('/busquedarapida/:arg',function(req,res,next){
    var searchArg = '%' + req.params.arg + '%';

    var userPromise = userModel.findAll({
        where: {
            [Op.or]: [
                {names: {
                    [Op.like]: searchArg
                }},
                {last_names: {
                    [Op.like]: searchArg
                }},
            ],
        },
    });

    var institutionPromise = institutionModel.findAll({
        where: {
            name: {
                [Op.like]: searchArg
            }
        }
    });

    var articlePromise = articleModel.findAll({
        where: {
            [Op.or]: [
                {name: {
                    [Op.like]: searchArg
                }},
                {area: {
                    [Op.like]: searchArg
                }},
            ],
        },
    });

    var campusPromise = campusModel.findAll({
        where:{
          name: {
            [Op.like]:searchArg
          }
        }
    });

    var collegePromise = collegeModel.findAll({
        where:{
          name: {
            [Op.like]:searchArg
          }
        }
    });

    Promise.all([userPromise, institutionPromise,articlePromise,campusPromise,collegePromise]).then(function(values){
        var users = values[0];
        var institutions = values[1];
        var articles = values[2];
        var campus = values[3];
        var colleges = values[4];
        var usersLen = users.length;
        var institutionsLen = institutions.length;
        var articlesLen = articles.length;
        var campusLen = campus.length;
        var collegesLen = colleges.length;

        if (users.length > 10){
            users = users.slice(0,10);
        }
        if (institutions.length > 10){
            institutions = institutions.slice(0,10);
        }
        if(articles.length > 10){
            articles = articles.slice(0,10);
        }
        if(campus.length > 10){
            campus = campus.slice(0,10);
        }
        if(colleges.length > 10){
            colleges = colleges.slice(0,10);
        }

        res.render('search',{
            users: users,
            institutions: institutions,
            articles: articles,
            campus: campus,
            colleges: colleges,
            institutionsTotal: institutionsLen,
            usersTotal:  usersLen,
            articlesTotal: articlesLen,
            campusTotal: campusLen,
            collegesTotal: collegesLen,
            query: req.params.arg,
            quickSearch: true
        });
    })
    .catch(error => {
        res.status(400);
        res.render('error', {
        message: 'Ocurrió un error',
        error: error
        });
    });


});

router.get('/personas/:persona', function(req,res){
    res.redirect(req.originalUrl + '/1')
});


router.get("/personas/:persona/:pagenum",function(req,res,next){
    var user = '%'+req.params.persona+'%';
    userModel.findAll({
        where: {
            [Op.or]: [
                {names: {
                    [Op.like]: user
                }},
                {last_names: {
                    [Op.like]: user
                }},
            ],
        },
    }).then(users => {
        var userList = users;
        if (userList.length > 10){
            var userList = users.slice((parseInt(req.params.pagenum) - 1)*10);
        }
        var totalPages = Math.ceil(users.length/10);
        if(userList.length > 10){
            userList = userList.slice(0,10);
        }
        res.render('search',{
            users: userList,
            usersTotal: users.length,
            totalPages: totalPages,
            userQuery: req.params.persona
        });
    })
    .catch(error => {
        res.status(400);
        res.render('error', {
        message: 'Ocurrió un error',
        error: error
        });
    });


});

router.get('/institucion/:institucion', function(req,res){
    res.redirect(req.originalUrl + '/1')
});

router.get("/institucion/:institucion/:pagenum",function(req,res,next){
    var institution = '%'+req.params.institucion+'%';
    institutionModel.findAll({
        where: {
            name: {
                [Op.like]: institution
            }
        }
    }).then(institutions => {
        var instList = institutions;
        if (instList.length > 10){
            var instList = institutions.slice((parseInt(req.params.pagenum) - 1)*10);
        }
        var totalPages = Math.ceil(institutions.length/10);
        if(instList.length > 10){
            instList = instList.slice(0,10);
        }
        res.render('search',{
            institutions: instList,
            institutionsTotal: institutions.length,
            totalPages: totalPages,
            instQuery: req.params.institucion
        });
    })
    .catch(error => {
        res.status(400);
        res.render('error', {
        message: 'Ocurrió un error',
        error: error
        });
    });


});

router.get('/articulo/:articulo', function(req,res){
    res.redirect(req.originalUrl + '/1')
});

router.get("/articulo/:articulo/:pagenum",function(req,res,next){
    var article = '%'+req.params.articulo+'%';
    articleModel.findAll({
        where: {
            [Op.or]: [
                {name: {
                    [Op.like]: article
                }},
                {area: {
                    [Op.like]: article
                }},
            ],
        },
    }).then(articles => {
        var articleList = articles;
        if (articleList.length > 10){
            var articleList = articles.slice((parseInt(req.params.pagenum) - 1)*10);
        }
        var totalPages = Math.ceil(articles.length/10);
        if(articleList.length > 10){
            articleList = articleList.slice(0,10);
        }
        res.render('search',{
            articles: articleList,
            articlesTotal: articles.length,
            totalPages: totalPages,
            artQuery: req.params.articulo
        });
    })
    .catch(error => {
        res.status(400);
        res.render('error', {
        message: 'Ocurrió un error',
        error: error
        });
    });


});


router.get('/campus/:campus', function(req,res){
    res.redirect(req.originalUrl + '/1')
});

router.get("/campus/:campus/:pagenum",function(req,res,next){
    var campus = '%'+req.params.campus+'%';
    campusModel.findAll({
        where: {
            name: {
                [Op.like]: campus
            }
        }
    }).then(campus => {
        var campList = campus;
        if (campList.length > 10){
            var campList = institutions.slice((parseInt(req.params.pagenum) - 1)*10);
        }
        var totalPages = Math.ceil(institutions.length/10);
        if(instList.length > 10){
            campList = instList.slice(0,10);
        }
        res.render('search',{
            campus: campList,
            campusTotal: campus.length,
            totalPages: totalPages,
            campQuery: req.params.campus
        });
    })
    .catch(error => {
        res.status(400);
        res.render('error', {
        message: 'Ocurrió un error',
        error: error
        });
    });


});

router.get('/colegio/:colegio', function(req,res){
    res.redirect(req.originalUrl + '/1')
});

router.get("/colegio/:colegio/:pagenum",function(req,res,next){
    var college = '%'+req.params.colegio+'%';
    collegeModel.findAll({
        where: {
            name: {
                [Op.like]: college
            }
        }
    }).then(colleges => {
        var collList = colleges;
        if (collList.length > 10){
            var collList = colleges.slice((parseInt(req.params.pagenum) - 1)*10);
        }
        var totalPages = Math.ceil(colleges.length/10);
        if(collList.length > 10){
            collList = collList.slice(0,10);
        }
        res.render('search',{
            colleges: collList,
            collegesTotal: colleges.length,
            totalPages: totalPages,
            collQuery: req.params.college
        });
    })
    .catch(error => {
        res.status(400);
        res.render('error', {
        message: 'Ocurrió un error',
        error: error
        });
    });


});

router.get('/avanzada',function(req,res,next){
    res.render('advanced-search');
});
module.exports = router;
