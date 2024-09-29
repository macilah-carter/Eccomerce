const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWTS

const router = express.Router();

router.get('/google', passport.authenticate('google',{
    scope: ['profile','email']
}));

router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/'}), (req, res) => {
    const user = req.user;

    const token = jwt.sign({id: user._id},jwt_secret,{
        expiresIn: "1hr"
    })
    res.cookie('token', token, {httpOnly: true})
    return res.json({token:token, user})
});

module.exports = router;
