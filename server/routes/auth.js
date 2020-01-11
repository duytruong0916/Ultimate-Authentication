const express = require('express');
const {signup,signin,accountActivation} =require('../controllers/auth');
const router =  express.Router();
//import validator
const {userSignupValidator,userSigninValidator} = require('../validators/auth');
const {runValidation} = require('../validators/index');


router.post('/signup',userSignupValidator,runValidation,signup)
router.post('/account-activation',accountActivation)
router.post('/signin',userSigninValidator,runValidation,signin)
module.exports = router;