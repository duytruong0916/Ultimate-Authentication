const express = require('express');
const {signup,signin,accountActivation,forgotpassword,resetpassword,googleLogin} =require('../controllers/auth');
const router =  express.Router();
//import validator
const {userSignupValidator,userSigninValidator,resetPasswordValidator,forgotPasswordValidator} = require('../validators/auth');
const {runValidation} = require('../validators/index');


router.post('/signup',userSignupValidator,runValidation,signup)
router.post('/account-activation',accountActivation)
router.post('/signin',userSigninValidator,runValidation,signin)
//Google login
router.post('/google-login',googleLogin)
//forgot - reset password
router.put('/forgot-password',forgotPasswordValidator,runValidation,forgotpassword )
router.put('/reset-password',resetPasswordValidator,runValidation,resetpassword )
module.exports = router;