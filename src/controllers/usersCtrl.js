// Usuarios

// Database
const db = require('../database/models');

//Requisitos de registracion
const {validationResult} = require('express-validator');
const config = require("../controllers/config.js");
const bcrypt = require('bcryptjs');
const {getToken, getTokenData} = require("../functions/jwt.js");
const {correo} = require("../functions/mailer.js");
const uuid = require("uuid");

// Controller
// Importante:
// funcion Store: Configurar los parametros del protocolo SMTP
//                Configurar los datos de la cuenta autorizada a enviar mails.
//                Configurar la ruta de confirmacion en la funcion 'getTemplate'.
//                Esto debe hacerse en la funcion /src/functions/mailer.js

const controller = {
  // Muestra formulario de Registro
  create: function (req, res) {
    delete req.session.avatar
    res.render("register", {misc: config.misc});
  }
  ,
  // Crea un nuevo usuario
  store: async function (req, res) {
    let validacionDeErrores = validationResult(req);
    let product = req.body;
    product.avatar = req.session.avatar;
    if (validacionDeErrores.errors.length > 0) {
      return res.render('register', {
        errors: validacionDeErrores.mapped(),
        misc: config.misc,
        oldData: product
      })
    } else {
      const email = req.body.usuario;
      db.User.findOne({where: {email: email}})
      .then(function(usuario) {
        if (usuario) {
          db.User.destroy({where: {email: email}})
          .then(function() {
          })
          .catch(function(errmsg) {
            res.send(errmsg);
          });
        }
      })
      .catch(function(errmsg) {
        res.send(errmsg);
      });
      // Codigo para generar un token version 4 RFC4122
      let uuidStr = uuid.v4();
      // Guardar el uuidStr y el estado del usuario para su posterior verificacion
      // Obtiene token
      const nombre = req.body.nombre;
      const apellido = req.body.apellido;
      const token = getToken({email, uuidStr});
      // Envia mail para activar
      let info = correo(email, nombre, apellido, token, "NewUser");
      if (info) {
        db.User.create({
          email: req.body.usuario,
          password: bcrypt.hashSync(req.body.password, 10),
          first_name: req.body.nombre,
          last_name: req.body.apellido,
          dni: req.body.dni,
          cell_phone: req.body.celular,
          address: req.body.direccion,
          zipcode: req.body.cp,
          city: req.body.localidad,
          avatar: req.file.filename,
          is_admin: false,
          active: false,
          uuid: uuidStr
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
    }
  }
  ,
  //edita el usuario activo
  edit: function (req, res) {
    db.User.findOne({where: {email: req.params.id}})
    .then(function(usuario) {
      let editUser = {
        usuario: usuario.email,
        nombre: usuario.first_name,
        apellido: usuario.last_name,
        dni: usuario.dni,
        celular: usuario.cell_phone,
        direccion: usuario.address,
        cp: usuario.zipcode,
        localidad: usuario.city,
        avatar: usuario.avatar
      }
      req.session.avatar = usuario.avatar;
      res.render("userProfile", {usuario: editUser, oldData: editUser, errors: "", misc: config.misc});
    })
    .catch(function(errmsg) {
      res.send(errmsg);
    });
  }
  ,
  // actualiza datos del usuario
  editStore: function (req, res) {
    let validacionDeErrores = validationResult(req);
    if (validacionDeErrores.errors.length > 0) {
          return res.render('userProfile', {
            errors: validacionDeErrores.mapped(),
            oldData: req.body,
            usuario: req.body,
            misc: config.misc
          });
    } else {
      const email = req.body.usuario;
      db.User.update({
        password: bcrypt.hashSync(req.body.password, 10),
        first_name: req.body.nombre,
        last_name: req.body.apellido,
        dni: req.body.dni,
        cell_phone: req.body.celular,
        address: req.body.direccion,
        zipcode: req.body.cp,
        city: req.body.localidad,
        avatar: (req.file.filename ? req.file.filename : req.session.avatar ),
        is_admin: false,
        active: true
      },
      {where: {email: email}})
      .then(function() {
        res.redirect("/login");
      })
      .catch(function(errmsg) {
        res.send(errmsg);
      });
    }
  }
  ,
  // Activa un nuevo usuario
  confirm: async function (req, res) {
    const token = req.params.token;
    // Verificamos el token
    const dataToken = await getTokenData(token);
    if (dataToken) {
      const email = dataToken.data.email;
      const uuidStr = dataToken.data.uuidStr;
      db.User.findOne({where: {email: email}})
      .then(function(usuario) {
        if (uuidStr == usuario.uuid) {
          db.User.update({
            active: true
          },
          {where: {email: email}})
          .then(function() {
            res.redirect("/login");
          })
          .catch(function(errmsg) {
            res.send(errmsg);
          });
        } else {
          res.send("Error de autenticación.");
        }
      })
      .catch(function(errmsg) {
        res.send(errmsg);
      });
    } else {
      res.send("No se pudo verificar el token recibido del usuario.");
    }
  }
  ,
  // Activa un cambio de contraseña
  newPass: async function (req, res) {
    const token = req.params.token;
    // Verificamos el token
    const dataToken = await getTokenData(token);
    if (dataToken) {
      const email = dataToken.data.email;
      const uuidStr = dataToken.data.uuidStr;
      db.User.findOne({where: {email: email}})
      .then(function(usuario) {
        if (usuario) {
          if (usuario.active) {
            res.send("El usuario '" + email + "' ya está activo.");
          } else {
            if (uuidStr == usuario.uuid) {
              let editUser = {
                usuario: usuario.email,
                nombre: usuario.first_name,
                apellido: usuario.last_name,
                dni: usuario.dni,
                celular: usuario.cell_phone,
                direccion: usuario.address,
                cp: usuario.zipcode,
                localidad: usuario.city,
                avatar: usuario.avatar
              }
              res.render("userProfile", {usuario: editUser, oldData: editUser, errors: "", misc: config.misc});
            } else {
              res.send("Error de autenticación.");
            }
          }
        } else {
          res.send("El usuario '" + email + "' no existe.");
        }
      })
      .catch(function(errmsg) {
        res.send(errmsg);
      });
    } else {
      res.send("No se pudo verificar el token recibido del usuario.");
    }
  }
}

module.exports = controller;