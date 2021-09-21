var express = require('express');
var router = express.Router();
var controller = require("../controllers/usersCtrl.js");
const rwdJson = require("../models/rwd-json.js");
// JSON path
const usersJson = "../../data/users.json";

//Requisitos para las validaciones 
const { body } = require ('express-validator');
const authUsuario = require('../middlewares/authUsuario.js');
const multer = require ('multer');
const path = require('path');

//Configuraciones de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, './public/images/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer ({ storage });

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
    body ('localidad').notEmpty().withMessage('Debes ingresar tu localidad.'),
    body ('avatar').custom( (value, { req }) => {
        let file = req.file;
        if (file == undefined){
            throw new Error('Tenes que subir una foto de perfil');
        } else {
            let extentions = ['.jpeg', '.jpg', '.png', '.gif'];
            let fileExtention = path.extname(file.originalname);
            if (!extentions.includes(fileExtention)) {
                throw new Error(`Las extensiones permitidas son ${extentions.join(', ')}`);
            }
        }
        return true;
    })
]

/* GET users listing. */
router.post("/", uploadFile.single('avatar'), validation, controller.store); // Crea un nuevo usuario
router.get("/", authUsuario, controller.create); // Muestra formulario de Registro

module.exports = router;