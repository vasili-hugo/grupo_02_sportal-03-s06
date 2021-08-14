var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Express' });
});

router.get('/producto', function(req, res, next) {
  res.render('producto', { title: 'Express' });
});

router.get('/carrito', function(req, res, next) {
  res.render('carrito', { title: 'Express' });
});

module.exports = router;
