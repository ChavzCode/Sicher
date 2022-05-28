const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const session = require('express-session');
const mysqlSession = require('express-mysql-session');
const flash = require('connect-flash'); 
const passport = require('passport');
const path = require('path');

//Keys
const { database } = require('./keys');
 
//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({
    defaultLayout:  'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', 'hbs');

//Middlewares
app.use(session({
    secret: 'SicherSession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlSession(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
})

//Routes
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/api', require('./routes/api'));
app.use('/shared', require('./routes/shared'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on Port  ${app.get('port')}`);
})