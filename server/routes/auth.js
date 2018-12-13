var express = require('express');
var router = express.Router();
var authRouter = require("../controllers/auth.js");
var signUpSchema = require("../validations/signup.js");
var logInSchema = require("../validations/login.js");

router.get('/acceso', authRouter.logInIndex);
router.post('/acceso', logInSchema, authRouter.logIn);

router.get('/salir',authRouter.logOut);

router.get('/registro', authRouter.signUpIndex);
router.post('/registro', signUpSchema, authRouter.signUp);

router.get('/confirmacion/:ficha', authRouter.confirmation);

module.exports = router;
