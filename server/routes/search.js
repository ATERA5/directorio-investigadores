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
        res.render('search',{
            users: users,
            institutions: institutions
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

router.get("/personas/:persona",function(req,res,next){
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
        res.render('search',{
            users: users,
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

router.get("/instituciones/:institucion",function(req,res,next){
    var institution = '%'+req.params.persona+'%';
    institutionModel.findAll({
        where: {   
            name: {
                [Op.like]: institution
            }
        }
    }).then(institutions => {
        res.render('search',{
            institutions: institutions
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