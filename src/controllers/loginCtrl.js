// Login

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
  // Muestra formulario de Login
  create:
    function(req, res) {
      res.render("login");
    }
  ,
  // Verifica credenciales del usuario
  store:
    function(req, res) {
      let usuario = null;
      let usuarios = rwdJson.readJSON(usersJson);
      if (usuarios) {
        usuario = usuarios.find(function (item){
          return (item.usuario == req.body.usuario);
        })
        if (usuario) {
          if (usuario.password == req.body.password) {
            res.send("Usuario logeado como " + req.body.usuario);
          } else {
            res.send("Usuario o contraseña inválidos");
          }
        } else {
          res.send("Usuario inexistente");
        }
      } else {
        res.send("Usuario inexistente");
      }
    }
  ,
  // Envia e-mail a la direccion informada para cambio de contraseña
  restore:
    function(req, res) {
      if (req.body.usuario == "") {
        res.send("Debe ingresar un e-mail");
      } else {
        res.send("Se ha enviado un e-mail a la dirección " + req.body.usuario);
      }
    }
}; 

module.exports = controller;