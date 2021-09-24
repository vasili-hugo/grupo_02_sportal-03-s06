const rwdJson = require("../models/rwd-json.js")

const funcionesComunes = {

  findUserByEmail:
    function (value, usersJson) {
      let usuarios = rwdJson.readJSON(usersJson);
      let usuario = usuarios.find (function(item) {
          return item.usuario == value;
      });
      return (usuario);
    }
}

module.exports = funcionesComunes;