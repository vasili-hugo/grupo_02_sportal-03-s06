// Usuarios

// In / Out File System
const rwdJson = require("./rwd-json.js");

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
*/

// Controller

const controller = {
  // Muestra formulario de Registro
  create:
    function (req, res) {
      res.render("register");
    }
  ,
  // Crea un nuevo usuario
  store:
    function (req, res) {
      let usuarios = [];
      let usuario = req.body.usuario;
      usuarios = rwdJson.readJSON(usersJson);
      let itemUsuario = null;
      if (usuarios != undefined) {
        itemUsuario = usuarios.find(function (item) {
          return (usuario == item.usuario);
        });
      }
      if (itemUsuario == null) {
        if (req.body.password == req.body.checkPassword) {
          let newItem = {
            usuario: req.body.usuario,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            celular: req.body.celular,
            direccion: req.body.direccion,
            cp: req.body.cp,
            localidad: req.body.localidad
          }
          if (usuarios == undefined) {
            let usuarios = [];
            usuarios.push(newItem);
            rwdJson.writeJSON(usersJson, usuarios, false);
          } else {
            usuarios.push(newItem);
            rwdJson.writeJSON(usersJson, usuarios, false);
          }
          res.redirect ("/login");
        } else {
          res.send("Las contraseñas ingresadas no coinciden.");
        }
      } else {
        res.send("Usuario existente. Pruebe con otro E-mail.");
      }
    }
}

module.exports = controller;