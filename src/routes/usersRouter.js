var express = require('express');
var router = express.Router();
var controller = require("../controllers/usersCtrl.js");
const funcs = require("./functions.js");
const config = require("../controllers/config.js");

// JSON path
const usersJson = "../../data/users.json";
const db = require ('../database/models')

//Requisitos para las validaciones 
const { body } = require ('express-validator');
const authUsuario = require('../middlewares/authUsuario.js');
const multer = require ('multer');
const path = require('path');

//Configuraciones de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //cb (null, './public/images/avatars');
        cb (null, path.join(__dirname, "../../public/images/avatars"));
    },
    filename: (req, file, cb) => {
        if (req.session.usuarioLogueado) {
            if (file.originalname == req.session.usuarioLogueado.avatar) {
                cb(null, file.originalname);
            } else {
                cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);
            }
        } else {
            cb(null, `${Date.now()}_img${path.extname(file.originalname)}`); 
        }
    }
});

const uploadFile = multer ({ storage });

const validation = [
    body ('usuario').notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
    .isEmail().withMessage('Debes ingresar un e-mail válido.').bail()
    .custom(value => {
        /* if (funcs.findUserByEmail(value, usersJson)) {
            throw new Error ('El correo que intenta registrar ya está en uso.')
        } */
        db.Users.findOne({
            where: {
                usuario: value
            }
        })
            .then((resultado) => {
                throw new Error ('El correo que intenta registrar ya está en uso.')
        });
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
        if(req.session.avatar) {
            req.file = req.session.avatar;
            return true;
        } else {
            if (file == undefined){
                throw new Error('Tenes que subir una imagen de perfil');
            } else {
                //let extentions = ['.jpeg', '.jpg', '.png', '.gif'];
                let extentions = config.misc.imageExt.split(",");
                let fileExtention = path.extname(file.originalname).toLowerCase();
                if (!extentions.includes(fileExtention)) {
                    throw new Error(`Las extensiones permitidas son ${extentions.join(', ')}`);
                }
            }
            req.session.avatar = file;
            return true;
        }
    })
]

const validationEdit = [
    body ('usuario')
    .notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
    .isEmail()
    .withMessage('Debes ingresar un e-mail válido.'),
    body ('password')
    .notEmpty().bail()
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage('La contraseña no cumple alguno de las sugerencias requeridas.'),
    body ('checkPassword')
    .notEmpty().withMessage('Debes completar nuevamente tu contraseña.').bail()
    .custom( (value, {req}) => {
        if (value != req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    body ('nombre').notEmpty().withMessage('Debes ingresar tu nombre.').bail(),
    body ('apellido').notEmpty().withMessage('Debes ingresar tu apellido.').bail(),
    body ('dni').isInt().withMessage('Debes ingresar tu DNI.').bail(),
    body ('celular').isInt().withMessage('Debes ingresar tu número de celular.').bail(),
    body ('direccion').notEmpty().withMessage('Debes ingresar tu dirección.').bail(),
    body ('cp').isInt().withMessage('Debes ingresar tu código postal.').bail(),
    body ('localidad').notEmpty().withMessage('Debes ingresar tu localidad.').bail(),
    body ('avatar').custom((value, { req }) => {
        let file = req.file;
        if (file == undefined){
            throw new Error('Tenes que subir una imagen de perfil');
        } else {
            //let extentions = ['.jpeg', '.jpg', '.png', '.gif'];
            let extentions = config.misc.imageExt.split(",");
            let fileExtention = path.extname(file.originalname).toLowerCase();
            if (!extentions.includes(fileExtention)) {
                throw new Error(`Las extensiones permitidas son ${extentions.join(', ')}`);
            }
        }
        return true;
    })
]

/* GET users listing. */
router.post("/", uploadFile.single('avatar'), validation, controller.store);                                     // Crea un nuevo usuario
router.get("/", authUsuario.authUsuario, controller.create);                                                     // Muestra formulario de Registro
router.post("/:id", uploadFile.single('avatar'), validationEdit, controller.editStore);                          // Edita usuario
router.get("/:id", authUsuario.testUsuario, controller.edit);                                                    // Muestra formulario edicion usuario
router.get("/confirm/:token", controller.confirm);                                                               // Confirma registro de usuario
router.get("/newPass/:token", controller.newPass);                                                               // Confirma blanqueo de contraseña

module.exports = router;