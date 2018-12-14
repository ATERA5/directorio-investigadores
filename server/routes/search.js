var express = require('express');
var router = express.Router();
var db =  require('../models/index');
const Op = db.Sequelize.Op;
var userModel = require('../models/user')(db.sequelize,db.Sequelize);
var institutionModel = require('../models/institution')(db.sequelize,db.Sequelize);

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

    Promise.all([userPromise, institutionPromise]).then(function(values){
        var users = values[0];
        var institutions = values[1];
        var usersLen = users.length;
        var institutionsLen = institutions.length;
        if (users.length > 10){
            users = users.slice(0,10);
        }
        if (institutions.length > 10){
            institutions = institutions.slice(0,10);
        }
        res.render('search',{
            users: users,
            institutions: institutions,
            institutionsTotal: institutionsLen,
            usersTotal:  usersLen,
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

router.get('/avanzada',function(req,res,next){
    res.render('advanced-search');
});
module.exports = router;