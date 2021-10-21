var express = require('express');
var router = express.Router();
var controller = require("../controllers/loginCtrl.js");
const validations = require ('../middlewares/validations.js')
const authUsuario = require ('../middlewares/authUsuario.js');
//const rwdJson = require("../models/rwd-json.js");
//const bcrypt = require ('bcryptjs');
//const funcs = require("./functions.js");

// JSON path
//const usersJson = "../../data/users.json";

//const { body } = require ('express-validator');

/* const validations = [
    body ('usuario').notEmpty().withMessage('Debes ingresar el correo electrónico.').bail()
    .custom( value  => {
        if (!funcs.findUserByEmail(value, usersJson)){
            throw new Error ('El correo ingresado no está registrado.')
        }
        return true;
    }),
    body ('password').notEmpty().withMessage('Debes ingresar tu contraseña.').bail()
    .custom( (value, {req}) => {
        let usuarios = rwdJson.readJSON(usersJson);
        let usuarioEncontrado = usuarios.find (user => user.usuario == req.body.usuario)
        if (!bcrypt.compareSync(value, usuarioEncontrado.password)) {
            throw new Error ('La contraseña es inválida.');
        }
        return true;
    })
] */

/* GET login page. */
router.get("/", authUsuario.authUsuario, controller.create);         // Muestra formulario de Login, si el usuario esta logueado lo redirige al home
router.post("/", validations.login, controller.store);               // Verifica credenciales del usuario
router.post("/restore", controller.restore);                         // Envia e-mail a la direccion informada para cambio de contraseña
router.get("/logout", controller.logout);                            // Logoff usuario

module.exports = router;