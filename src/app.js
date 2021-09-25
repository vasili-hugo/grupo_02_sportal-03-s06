/* Bitacora
10/09/2021 - Se agrego el componente 'Session'. Achtung!!! debe ser insertado el app.use(session(...)) antes del app.use(express.static(...))
19/09/2021 - Se elimino la ruta '/producto' y el router 'productoRouter'. Se lo reemplaza por '/productos/detail'.
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require("method-override");
const session = require("express-session");
const recordame = require('./middlewares/recordame.js');
const usuarioLogueado = require('./middlewares/usuarioLogueado.js');

// routers
const indexRouter = require('./routes/indexRouter.js');
const productosRouter = require('./routes/productosRouter.js');
const carritoRouter = require('./routes/carritoRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const usersRouter = require('./routes/usersRouter.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(session({secret: "HugoLucianoSergio", resave: true, saveUninitialized: true}));
app.use(recordame);
app.use(usuarioLogueado);
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/profile', usersRouter);
app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);
app.use('/register', usersRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/home', indexRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;