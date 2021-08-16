var express = require('express');
var router = express.Router();
var controller = require("../controllers/cargaProducto.js");

/* GET pagina de carga de Producto */
router.get ('/', controller.retrive)

module.exports = router;