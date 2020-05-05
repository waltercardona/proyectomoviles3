const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Global Variables
app.use((req, res, next) => {
    // res.locals.success_msg = req.flash('success_msg'); // se guarda en variable del servidor el mensaje de connect-flash
    // res.locals.error_msg = req.flash('error_msg'); // se guarda en variable del servidor el mensaje de connect-flash
    // res.locals.error = req.flash('error'); // se guarda en variable del servidor el mensaje de error de passport
    // res.locals.user = req.user || null; // guarda en variable user si el usuario fue autenticado o no para permitirle o denegarle el acceso a las diferentes vistas de la app, esta info la pasa passport.
    next();
})

// Routes
const user_routes = require('./routes/users.routes');
const cita_routes = require('./routes/citas.routes');
app.use("/api", user_routes);
app.use("/api", cita_routes);

// Statics Files
// app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;