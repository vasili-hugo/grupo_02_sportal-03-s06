// Usuarios

// In / Out File System
const rwdJson = require("../models/rwd-json.js");

//Requisitos de registracion
const {validationResult} = require('express-validator');
const config = require("../controllers/config.js");
const bcrypt = require('bcryptjs');

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
cp        : Codigo Postal (X)
localidad : Localidad (X)
avatar    : Foto de perfil (X)
isAdmin   : true/false
active    : true/false
uuid      : uuid (formato especifico)
*/

// Controller

const controller = {
  // Muestra formulario de Registro
  create: function (req, res) {
    delete req.session.avatar
    res.render("register", {misc: config.misc});
  },
  // Crea un nuevo usuario
  store: function (req, res) {
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
      let newItem = {
        usuario: req.body.usuario,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        celular: req.body.celular,
        direccion: req.body.direccion,
        cp: req.body.cp,
        localidad: req.body.localidad,
        avatar: req.file.filename
      }
      let usuarios = rwdJson.readJSON(usersJson);
      if (!usuarios) {
        usuarios = []
      };
      usuarios.push(newItem);
      rwdJson.writeJSON(usersJson, usuarios);
      res.redirect("/login");
    }
  },
  //edita el usuario activo
  edit: function (req, res) {
    let usuarios = rwdJson.readJSON(usersJson);
    if (!usuarios) {
      usuarios = []
    };
    
    let usuario = {}
    for (i=0; i< usuarios.length; i++){
      if (usuarios[i].usuario == req.params.id){
        usuario = usuarios[i];
      }
    }
    res.render("userProfile", {usuario});
  },
  // actualiza datos del usuario
  editStore: function (req, res) {
    let validacionDeErrores = validationResult(req);
    if (validacionDeErrores.errors.length > 0) {
      return res.render('userProfile', {
        errors: validacionDeErrores.mapped(),
        oldData: req.body,
        usuario: req.body
      })
    } else {
      let newItem = {
        usuario: req.body.usuario,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        celular: req.body.celular,
        direccion: req.body.direccion,
        cp: req.body.cp,
        localidad: req.body.localidad,
        avatar: req.file.filename
      }
      let usuarios = rwdJson.readJSON(usersJson);
      for (i=0; i< usuarios.length; i++){
        if (usuarios[i].usuario == req.params.id){
          usuarios[i] = newItem;
        }
      }
      rwdJson.writeJSON(usersJson, usuarios);
      res.redirect("/home")
    }
  }
}

module.exports = controller;