const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// Initializations
const app = express();
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ // configurar el motor de plantillas
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
// app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({ //para enviar mensajes a través de connect-flash
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // envía los mensajes de stayless cuando se navega entre páginas etc.

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // se guarda en variable del servidor el mensaje de connect-flash
    res.locals.error_msg = req.flash('error_msg'); // se guarda en variable del servidor el mensaje de connect-flash
    res.locals.error = req.flash('error'); // se guarda en variable del servidor el mensaje de error de passport
    res.locals.user = req.user || null; // guarda en variable user si el usuario fue autenticado o no para permitirle o denegarle el acceso a las diferentes vistas de la app, esta info la pasa passport.
    next();
})

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/citas.routes'));
app.use(require('./routes/users.routes'));

// Statics Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;