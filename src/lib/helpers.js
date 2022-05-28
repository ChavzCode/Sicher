const bcrypt = require('bcryptjs');
const passport = require('passport');
const helpers = {}

//Bcrypt Password Encrypting
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash
}

helpers.comparePassword = async (password, encrypted) => {
    return await bcrypt.compare(password, encrypted);
}

//Is authenticated?
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else{
        req.flash('success', 'Log in to get access to Sicher')
        return res.redirect('/auth');
    }
}

helpers.isNotAuthenticated = (req, res, next) => {
    if(! req.isAuthenticated()) {
        return next();
    }else{
        return res.redirect('/links');
    }
}

//Get Today Date
helpers.getTodayDate = () =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let todayDate = `${year}-${month}-${day}`;
    return todayDate;
}

//API Date Validity
helpers.isApiAvailable = (apiAvailabity) => {
    const now = new Date(helpers.getTodayDate())
    const limitTime = new Date(apiAvailabity)
    if(now.getTime() < limitTime.getTime()){
        return true;
    }else{
        return false;
    }
}

module.exports = helpers;