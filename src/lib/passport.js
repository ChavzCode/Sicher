const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
const connection = require('../database');
const helpers = require('./helpers');

//Login
passport.use('local.signin', new LocalStrategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        const rows = await connection.query(`SELECT * FROM users WHERE username = "${username}"`);
        if(rows.length > 0){
            const user = rows[0];
            const validPassword = await helpers.comparePassword(password, user.password);
            if(validPassword){
                done(null, user, req.flash('success', `Welcome ${user.username}`));
            }else{
                done(null, false, req.flash('message', 'Incorrect Password'));
            }
        }else{
            done(null, false, req.flash('message', 'Incorrect User'))
        }
    }
));

//Sign Up
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,

}, async (req, username, password, done) => {
    const { fullname } = req.body;
    let user = {username, password, fullname};
    user.password = await helpers.encryptPassword(password);
    const rows = await connection.query(`INSERT INTO users (username, password, fullname) VALUES ("${user.username}", "${user.password}", "${user.fullname}");`)
    user.id = rows.insertId;
    return done(null, user);
}));

//Serialize and deserialize user - https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, done) => {
    done(null, user.id); //req.session.passport.user = {user.id}
})

passport.deserializeUser( async (id, done) => {
    const rows = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
    done(null, rows[0]);
})

