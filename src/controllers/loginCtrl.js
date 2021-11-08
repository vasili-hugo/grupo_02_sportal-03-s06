// Login

// Database
const db = require('../database/models');

//Requisitos de registracion
const {validationResult} = require ('express-validator');
const {getToken} = require("../functions/jwt.js");
const {correo} = require("../functions/mailer.js");
const uuid = require("uuid");

// Controller
// Importante:
// funcion Restore: Configurar los parametros del protocolo SMTP
//                  Configurar los datos de la cuenta autorizada a enviar mails.
//                  Configurar la ruta de confirmacion en la funcion 'getTemplate'.
//                  Esto debe hacerse en la funcion /src/functions/mailer.js

const controller = {
  // Muestra formulario de Login
  create:
    function(req, res) {
      res.render("login");
    }
  ,
  // Verifica credenciales del usuario
  store:
    function(req, res) {
      let validacionDeErrores = validationResult(req);
      if (validacionDeErrores.errors.length > 0) {
        return res.render ('login', { 
          errors: validacionDeErrores.mapped(),
          oldData: req.body
        })
      } else {
        db.User.findOne({where: {email: req.body.usuario}})
        .then(function(usuarioEncontrado) {
          if (usuarioEncontrado) {
            req.session.usuarioLogueado = usuarioEncontrado;
            if (req.body.recordame) {
              res.cookie('recordame', usuarioEncontrado.id, {maxAge: 1000 * 60 * 60 * 60 * 24});
            }
          }
          res.redirect ('/home');
        })
        .catch(function(errmsg) {
          res.send(errmsg);
        });
      }
    }
  ,
  // Envia e-mail a la direccion informada para cambio de contraseña
  restore:
    async function(req, res) {
      let validacionDeErrores = validationResult(req);
      if (validacionDeErrores.errors.length > 0) {
        res.render ('login', { 
          errors: validacionDeErrores.mapped(),
          oldData: req.body
        });
      } else {
        // Actualizo el usuario
        const email = req.body.usuario;
        db.User.findOne({where: {email: email}})
        .then(function(usuario) {
          if (usuario) {
            // Codigo para generar un token version 4 RFC4122
            let uuidStr = uuid.v4();
            // Obtiene token
            const nombre = usuario.first_name;
            const apellido = usuario.last_name;
            const token = getToken({email, uuidStr});
            // Envia mail para activar
            let info = correo(email, nombre, apellido, token, "NewPass");
            if (info) {
              // Guarda el uuidStr y el estado del usuario para su posterior verificacion
              db.User.update({
                active: false,
                uuid: uuidStr
                },
                {where: {email: email}
              })
              .then(function() {
                res.send("Se ha enviado un correo a " + email);                
              })
              .catch(function(errmsg) {
                res.send(errmsg);
              });
            } else {
              res.send("No se ha podido enviar un correo a " + email);
            }
          } else {
            res.send("El usuario '" + email + "' no existe.");
          }
        })
        .catch(function(errmsg) {
          res.send(errmsg);
        });
      }
    }
,
  // Logoff usuario
  logout:
    function (req, res) {
      delete req.session.usuarioLogueado;
      if (req.cookies.recordame) {
        res.cookie('recordame', req.cookies.recordame, {maxAge: 0});
      }
      res.redirect("/home");
    }
};

module.exports = controller;