/* Bitacora
10/09/2021 - Se agrego el componente 'Session'. Achtung!!! debe ser insertado el app.use(session(...)) antes del app.use(express.static(...))
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var session = require("express-session");
var recordame = require('./middlewares/recordame.js');

// routers
var indexRouter = require('./routes/indexRouter.js');
var productosRouter = require('./routes/productosRouter.js');
var productoRouter = require('./routes/productoRouter.js');
var carritoRouter = require('./routes/carritoRouter.js');
var loginRouter = require('./routes/loginRouter.js');
var usersRouter = require('./routes/usersRouter.js');

var app = express();

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
app.use(express.static(path.join(__dirname, '../public')));

// routers
var indexRouter = require('./routes/indexRouter.js');
var productosRouter = require('./routes/productosRouter.js');
var productoRouter = require('./routes/productoRouter.js');
var carritoRouter = require('./routes/carritoRouter.js');
var loginRouter = require('./routes/loginRouter.js');
var usersRouter = require('./routes/usersRouter.js');

// routes
app.use('/productos', productosRouter);
app.use('/producto', productoRouter); // Cuando se revise la vista de productos, cada producto debera ser
                                      // llamado por /productos/detail/:id desde productosRouter.detail
                                      // luego eliminar esta ruta y su router (productoRouter.js)
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
