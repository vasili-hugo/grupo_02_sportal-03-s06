var express = require('express');
var router = express.Router();
var controller = require("../controllers/loginCtrl.js");
const rwdJson = require("../controllers/rwd-json");
const bcrypt = require ('bcryptjs');
const authUsuario = require ('../middlewares/authUsuario');
// JSON path
const usersJson = "../../data/users.json";

const { body } = require ('express-validator');

const validations = [
    body ('usuario').notEmpty().withMessage('Debes ingresar el correo electronico.').bail()
    .custom( value  => {
        if (!rwdJson.findUserByEmail(value, usersJson)){
            throw new Error ('El correo ingresado no esta registrado.')
        }
        return true;
    }),
    body ('password').notEmpty().withMessage('Debes ingresar tu contraseña.').bail()
    .custom( (value, {req}) => {
        let usuarios = rwdJson.readJSON(usersJson);
        let usuarioEncontrado = usuarios.find (user => user.usuario == req.body.usuario)
        if (!bcrypt.compareSync(value, usuarioEncontrado.password)) {
            throw new Error ('La contraseña es invalida.');
        }
        return true;
    })
]

/* GET login page. */
router.get("/", authUsuario, controller.create);                        // Muestra formulario de Login, si el usuario esta logueado lo redirige al home
router.post("/", validations, controller.store);                        // Verifica credenciales del usuario
router.post("/restore", validations, controller.restore);            // Envia e-mail a la direccion informada para cambio de contraseña

module.exports = router;