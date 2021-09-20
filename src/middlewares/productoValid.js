/* Bitacora
10/09/2021 - Se validan todos los campos excepto aquellos que informan imagenes. Estos se validan desde el controlador.
*/

const {check} = require("express-validator");

const validations = [
  check("id").notEmpty().withMessage("Campo obligatorio"),
  check("brand").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("heading").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("model").notEmpty().withMessage("Campo obligatorio"),
  check("desc").notEmpty().withMessage("Campo obligatorio"),
  check("price").isInt().withMessage("Campo numérico mayor de cero"),
  check("age").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("sex").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("color").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable")
];

module.exports = validations;