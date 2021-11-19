var express = require('express');
var router = express.Router();
var controller = require("../controllers/loginCtrl.js");
const validations = require ('../middlewares/validations.js')
const authUsuario = require ('../middlewares/authUsuario.js');

/* GET login page. */
router.get("/", authUsuario.authUsuario, controller.create);         // Muestra formulario de Login, si el usuario esta logueado lo redirige al home
router.post("/", validations.login, controller.store);               // Verifica credenciales del usuario
router.post("/restore", controller.restore);                         // Envia e-mail a la direccion informada para cambio de contraseña
router.get("/logout", controller.logout);                            // Logoff usuario

module.exports = router;