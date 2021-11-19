/* Bitacora
10/09/2021 - Se validan todos los campos excepto aquellos que informan imagenes. Estos se validan desde el controlador.
20/10/2021 - Se cambio el nombre del campo id a code. Se agrego validacion para el campo family.
*/

const {check} = require("express-validator");

const validateCreate = [
  check("code").notEmpty().withMessage("Campo obligatorio"),
  check("brand").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("heading").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("model").notEmpty().withMessage("Campo obligatorio"),
  check("family").notEmpty().withMessage("Campo obligatorio"),
  check("desc").notEmpty().withMessage("Campo obligatorio"),
  check("price").isCurrency().withMessage("Campo numérico mayor de cero"),
  check("age").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("sex").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("color").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable")
];

const validateUpdate = [
  check("brand").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("heading").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("model").notEmpty().withMessage("Campo obligatorio"),
  check("family").notEmpty().withMessage("Campo obligatorio"),
  check("desc").notEmpty().withMessage("Campo obligatorio"),
  check("price").isCurrency().withMessage("Campo numérico mayor de cero"),
  check("age").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("sex").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable"),
  check("color").notEmpty().withMessage("Debe seleccionar un ítem de la lista desplegable")
];

module.exports = {validateCreate, validateUpdate};