const User = require('../models/user');
const jwt =require('jsonwebtoken')
const sgMail =  require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);


exports.signup = (req,res)=>{
    const {firstname,lastname, email, password, address, phone} = req.body;
    User.findOne({email}).exec((err,user)=>{
        if(user){
           return res.status(400).json({error:'Email is already associate with an account'})
        }
    })
    const token = jwt.sign({firstname,lastname,email,password,phone,address},process.env.JWT_ACCOUNT_ACCTIVATION, {expiresIn: '10m'});
    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Account Activation Link`,
        html: `
                <p>Please use the following link to activate your account: </p>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email might contain sensitive information </p>
                <p>${process.env.CLIENT_URL}</p>
            `
    }
    console.log(emailData)
    sgMail.send(emailData).then(send=>{
        return res.json({message: `An email has been sent to ${email}. Follow the instruction to activate your account `})
    }).catch(err=>{
        res.status(400).json({message: err.message})
    })
}

exports.accountActivation = (req,res)=>{
    const {token} = req.body;
    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACCTIVATION, function(err,decoded){
            if(err){
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err)
                return res.status(401).json({error: 'Expired link. Signup again!'})
            }
            const {firstname,lastname, email, password, addressinfo, phone} = jwt.decode(token);
            const newUser  = new User({firstname,lastname, email, password, address:addressinfo, phone});
            newUser.save((error,user)=>{
                if(error){
                    console.log('Error saving user!')
                    return res.status(400).json({error: 'Error saving user'})
                }
                res.json({message: 'A new account was created successfully'})
            })
        })
    }
}

exports.signin = (req,res)=>{
    const {email, password} = req.body;
    User.findOne({email}).exec((error,user)=>{
        if(error||!user){
            return res.status(400).json({error: 'User does not exist.'});
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({error: 'User and Password do not match'});

        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        const {_id, firstname,lastname, email, role, address, phone} = user;
        res.json({
            token: token,
            user: {_id, firstname,lastname, email, role, address, phone}
        })
    })
}