var express = require('express');
var router = express.Router();
var controller = require("../controllers/usersCtrl.js");

const { body } = require ('express-validator');

const validation = [
    body ('usuario').isEmail().withMessage('Debes ingresar un e-mail válido.'),
    body ('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('La contraseña no cumple alguno de las sugerencias requeridas.'),
    /* body ('checkPassword').equals(req.body.password).withMessage('Las contraseñas no coinciden.') */
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
router.get("/",controller.create); // Muestra formulario de Registro

module.exports = router;