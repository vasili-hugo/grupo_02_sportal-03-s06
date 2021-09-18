var express = require('express');
var router = express.Router();
var controller = require("../controllers/usersCtrl.js");
const rwdJson = require("../controllers/rwd-json");
// JSON path
const usersJson = "../../data/users.json";

const { body } = require ('express-validator');
const authUsuario = require('../middlewares/authUsuario.js');

const validation = [
    body ('usuario').notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
    .isEmail().withMessage('Debes ingresar un e-mail válido.').bail()
    .custom(value => {
        if (rwdJson.findUserByEmail(value, usersJson)) {
            throw new Error ('El correo que intenta registrar ya esta en uso.')
        }
        return true;
    }),
    body ('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').bail().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('La contraseña no cumple alguno de las sugerencias requeridas.'),
    body ('checkPassword').notEmpty().withMessage('Debes completar nuevamente tu contraseña.').bail()
    .custom( (value, {req}) => {
        if (value != req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    body ('nombre').notEmpty().withMessage('Debes ingresar tu nombre.'),
    body ('apellido').notEmpty().withMessage('Debes ingresar tu apellido.'),
    body ('dni').isInt().withMessage('Debes ingresar tu DNI.'),
    body ('celular').isInt().withMessage('Debes ingresar tu número de celular.'),
    body ('direccion').notEmpty().withMessage('Debes ingresar tu dirección.'),
    body ('cp').isInt().withMessage('Debes ingresar tu código postal.'),
    body ('localidad').notEmpty().withMessage('Debes ingresar tu localidad.')
]

/* GET users listing. */
router.post("/", validation, controller.store); // Crea un nuevo usuario
router.get("/", authUsuario, controller.create); // Muestra formulario de Registro

module.exports = router;