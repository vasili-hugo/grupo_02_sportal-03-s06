var express = require('express');
var router = express.Router();
var controller = require("../controllers/loginCtrl.js")

/* GET login page. */
router.post("/access",controller.store);    // Verifica credenciales del usuario
router.post("/restore",controller.restore); // Envia e-mail a la direccion informada para cambio de contraseña
router.get("/",controller.create);          // Muestra formulario de Login

module.exports = router;