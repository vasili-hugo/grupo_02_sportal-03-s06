const db = require ('../database/models');
const { body } = require ('express-validator');
const bcrypt = require ('bcryptjs');
const multer = require ('multer');
const path = require('path');
const config = require("../controllers/config.js");

//Configuraciones de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
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

const validations = {
    login: [
        body ('usuario').notEmpty().withMessage('Debes ingresar el correo electrónico.').bail()
        .isEmail().withMessage('Debes ingresar un e-mail válido.').bail()
        .custom( value  => {
            return db.User.findOne({
                where: {email: value}
            }).then(usuario => {
                if (usuario) {
                    if (!usuario.active) {
                        return Promise.reject("El usuario no está activo.")
                    }
                } else {
                    return Promise.reject ('El correo ingresado no está registrado.');
                }
            })
            .catch(function(errmsg) {
                throw new Error(errmsg);
            });
        }),
        body ('password').notEmpty().withMessage('Debes ingresar tu contraseña.').bail()
        .custom( (value, {req}) => {
            return db.User.findOne( {
                where: {email: req.body.usuario}
            }).then(usuario => {
                if (usuario) {
                    if (!bcrypt.compareSync(value, usuario.password)) {
                        return Promise.reject ('La contraseña es inválida.');
                    }
                } else {
                    return Promise.reject (' ');
                }
            })
            .catch(function(errmsg) {
                throw new Error(errmsg);
            });
        })
    ],
    register: [
        body ('usuario').notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un e-mail válido.').bail()
        .custom(value => {
            return db.User.findOne({
                where: {email: value}
            }).then((resultado) => {
                if (resultado) {
                    return Promise.reject('El correo que intenta registrar ya está en uso.');
                }
            })
            .catch(function(errmsg) {
                throw new Error(errmsg);
            });
        }),
        body ('password').notEmpty().withMessage('Debes ingresar tu contraseña.').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('La contraseña no cumple alguna de las sugerencias requeridas.'),
        body('checkPassword').notEmpty().withMessage('Debes completar nuevamente tu contraseña.').bail()
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
    ],
    edit: [
        body ('usuario').notEmpty().withMessage('Debes ingresar tu correo electrónico').bail()
        .isEmail().withMessage('Debes ingresar un e-mail válido.'),
        body ('password').notEmpty().withMessage('Debes ingresar tu contraseña.').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.').bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('La contraseña no cumple alguna de las sugerencias requeridas.'),
        body ('checkPassword').notEmpty().withMessage('Debes completar nuevamente tu contraseña.').bail()
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
            if(req.session.avatar) {
                req.file = req.session.avatar;
                return true;
            } else {
                if (file != undefined){
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
    ],

    uploadFile: multer ({ storage })
}
module.exports = validations;