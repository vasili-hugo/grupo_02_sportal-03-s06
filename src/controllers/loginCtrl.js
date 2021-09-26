// Login

// In / Out File System
const rwdJson = require("../models/rwd-json.js");

//Requisitos de registracion
const { validationResult } = require ('express-validator');

// JSON path
const usersJson = "../../data/users.json";

/* JSON Layout
usuario   : e-mail (X)
password  : Contraseña (X)
nombre    : Nombres (X)
apellido  : Apellidos (X)
dni       : DNI (N)
celular   : Celular (N)
direccion : Direccion (X)
localidad : Localidad (X)
avatar    : Foto de perfil (X)
*/

// Controller
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
        let usuarios = rwdJson.readJSON(usersJson);
        let usuarioEncontrado = usuarios.find (user => user.usuario == req.body.usuario);
        req.session.usuarioLogueado = usuarioEncontrado;
        if (req.body.recordame != undefined) {
          res.cookie('recordame', usuarioEncontrado.email, {maxAge: 1000 * 60 * 60 * 60 * 24});
        }
        res.redirect ('/home');
      }
    }
  ,
  // Envia e-mail a la direccion informada para cambio de contraseña
  restore:
    function(req, res) {
      let validacionDeErrores = validationResult(req);
      if (validacionDeErrores.errors.length > 0) {
        return res.render ('login', { 
          errors: validacionDeErrores.mapped(),
          oldData: req.body
        })
      } else {
        res.send("Se ha enviado un e-mail a la dirección " + req.body.usuario);
      }
    }
  ,
  // Logoff usuario
  logout:
    function (req, res) {
      delete req.session.usuarioLogueado;
      res.redirect("/home");
    }
}; 

module.exports = controller;