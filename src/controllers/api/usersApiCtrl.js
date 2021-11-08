// Usuarios

// In / Out File System
const db = require('../../database/models');

// Config
const config = require("../../controllers/config.js");

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
  // Devuelve todos los usuarios
  allUsers:
    // Uso: /api/users/?rpp=<number>&page=<number>
    function (req, res) {
      // Paginacion
      let rpp = (req.query.rpp ? req.query.rpp : 0);
      let page = (req.query.page ? req.query.page : 1);
      let params = {};
      if (rpp > 0) {
        params = {
          limit: Number(rpp),
          offset: Number(rpp * (page - 1))
        }
      }
      // Seleccion
      db.User.findAll(params)
      .then(function(records) {
        let result = {};
        let userArray = [];
        records.map(function (elem) {
          let user = {
            id: elem.id,
            email: elem.email,
            name: elem.last_name + " " + elem.first_name,
            detail: config.misc.urlSite + "/api/users/" + elem.id
          }
          userArray.push(user);
        });
        result.count = records.length;
        result.users = userArray;
        result.status = 200;
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  // Devuelve un usuario
  oneUser:
      // Uso: /api/users/<id>
    function (req, res) {
      db.User.findByPk(req.params.id)
      .then(function (result) {
        let record = {
          id: result.id,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          dni: result.dni,
          cell_phone: result.cell_phone,
          address: result.address,
          zipcode: result.zipcode,
          city: result.city,
          avatar: config.misc.urlSite + config.misc.pathAvatar + result.avatar
        }
        res.json(record);
      })
      .catch(function (errMsg) {
        res.json(errMsg);
      });
    }
}

module.exports = controller;