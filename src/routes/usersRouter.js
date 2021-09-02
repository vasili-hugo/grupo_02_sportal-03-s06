var express = require('express');
var router = express.Router();
var controller = require("../controllers/usersCtrl.js")

/* GET users listing. */
router.post("/create",controller.store); // Crea un nuevo usuario
router.get("/",controller.create);       // Muestra formulario de Registro

module.exports = router;