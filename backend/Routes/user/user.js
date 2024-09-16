const express = require('express');
const User = require('../../Database/schema/user')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const verifyAdmin = require('../admin/adminAuth')

// const verify = require('./userAuth')

const router = express.Router();
const jwt_secret = "mysecret"

router.get('/', async(req, res) => {
    console.log('user')
    res.status(200).json({msg:'user get'})
});

router.post('/signup', async(req, res) => {
    const {name, email, password } = req.body;
  
    try {
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(201).json({message: 'user With such details exist'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user =  await User.create({name, email, password:hashedPassword});
        return res.status(200).json({msg: 'Added user successfully', user})
    } catch (error) {
        let message;
        if(error.errors && error.errors.email){
        message = error.errors.email.message
        return res.status(200).json({msg:message})
        }
        else if(error.errors && error.errors.password){
        message = error.errors.password.message
        return res.status(200).json({msg:message})
        }else{
        console.log('the error',error)
        return res.status(500).json({msg:error.message})
        }
    }
    
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(200).json({message: "Email and password cannot be empty"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(201).json({message:"User does not exist"});
        }
        const dehashPass = await bcrypt.compare(password, user.password);
        if(!dehashPass){
            return res.status(201).json({message:"The passsword did not match the email"})
        }
        const token = jwt.sign({userId: user._id}, jwt_secret, {
            expiresIn:"1hr"
        });
        res.cookie('token',token, {httpOnly: true})
        return res.status(200).json({message:"logged in the following user",user,token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
});

module.exports = router;