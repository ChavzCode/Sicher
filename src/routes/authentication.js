const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotAuthenticated } = require('../lib/helpers');

//Auth Routes
router.get('/auth', isNotAuthenticated, (req, res) => {
   res.render('auth/auth');
})

//Sign In
router.post('/signin', isNotAuthenticated, passport.authenticate('local.signin', {
    successRedirect: '/links',
    failureRedirect: '/auth',
    failureFlash: true    
}));

//Sign Up
router.post('/signup', isNotAuthenticated,  passport.authenticate('local.signup', {
    successRedirect: '/links',
    failureRedirect: '/auth',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/')
})

module.exports = router;