// In / Out File System

/* Bitacora
17/09/2021 - Se elimino el parametro 'brackets' de la funcion 'writeJSON'.
           - Se movio de la carpeta 'controllers' a la carpeta 'models'.
*/

const fs = require('fs');
const path = require("path");

let rwdJson = {
  // Informa error
  errMsg: false,
  // Lee un JSON y lo transforma en objeto
  readJSON: function (fileName) {
    try {
      objson = JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8'));
      this.errMsg = false;
      return objson;
    } catch (error) {
      this.errMsg = true;
    }
    return;
  },
  // Graba un JSON objeto.
  writeJSON: function (fileName, newJson) {
    try {
      let newFile = JSON.stringify(newJson)
      fs.writeFileSync(path.join(__dirname, fileName), newFile);
      this.errMsg = false;
    } catch (error) {
      this.errMsg = true;
    }
    return;
  },
  // Elimina un archivo
  deleteJSON: function (fileName) {
    try {
      fs.unlinkSync(path.join(__dirname, fileName));
      //this.errMsg = false;
    } catch (error) {
      this.errMsg = true;
    }
    return;
  }
}

module.exports = rwdJson;