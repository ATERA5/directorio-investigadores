var db = require('../models/index')


module.exports = {
    /*
    Revisa la base de datos para ver si existe el corre y luego confirma que las contraseñas coincidan.
    */
    confirmLogIn(req,res){
        var email = req.body.email;
        var password = req.body.password;
        console.log(req.body);
        db.sequelize.query('SELECT * FROM User WHERE email=?',{type: db.Sequelize.QueryTypes.SELECT,raw: true, replacements:[email]})
        .then(user => {
            if (user.length!=1) {
                res.send('Usuario o contraseña inválida.');
            } else {
                res.send('Autentificación completada');  
            }
        });
    }


}