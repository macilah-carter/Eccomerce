const express = require('express');
const Admin = require('../../Database/schema/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const jwt_secret = "mysecret"


const router = express.Router();


router.get('/',(req,res) => {
    console.log('admin get');
    return res.status(200).json({message: "All good"})
});

router.post('/signup',async(req, res) => {
    const {name, password, email, role} = req.body;

    try {
        const adminExist = await Admin.findOne({email});
        if(adminExist){
            return res.status(302).json({message: "The admin with that email and name exist"})
        }
        const hashpwd = await bcrypt.hash(password, 10);
        const admin = await Admin.create({email, name, password:hashpwd, role});
        return res.status(200).json({message: "Added the following user as admin successfull", admin})
    } catch (error) {
        let message;
        if(error.errors && error.errors.email){
            message = error.errors.email.message;
            return res.status(201).json({message: message});
        }
        else if(error.errors && error.errors.password){
            message = error.errors.password.message;
            return res.status(201).json({message: message});
        } else{
            console.log(error.message);
            return res.status(500).json({message: error.message});
        }
    }
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(200).json({message: "Email and password cannot be empty"})
        }
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(201).json({message:"Admin does not exist"});
        }
        const dehashPass = await bcrypt.compare(password, admin.password);
        if(!dehashPass){
            return res.status(201).json({message:"The passsword did not match the email"})
        }
        const token = jwt.sign({adminId: admin._id, role: admin.role}, jwt_secret, {
            expiresIn:"1hr"
        });
        res.cookie('token',token, {httpOnly: true})
        return res.status(200).json({message:"logged in the following user",admin,token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
});

module.exports = router;