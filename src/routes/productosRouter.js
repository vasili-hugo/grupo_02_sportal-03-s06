const express = require('express');
const router = express.Router();
const productosCtrl = require("../controllers/productosCtrl.js");
const uploadMany = require('../middlewares/productoImages.js');
const {validateCreate, validateUpdate} = require("../middlewares/productoValid.js");

/* GET products page. */
router.get("/search", productosCtrl.search);                                      // Muestra todos los productos segun el criterio de busqueda
router.get("/detail/:id",productosCtrl.readOne);                                  // Muestra un producto.
router.get("/:id", productosCtrl.readAll);                                        // Muestra todos los productos correspondientes a ese rubro
router.post("/crear", uploadMany, validateCreate, productosCtrl.abmInsert);       // Crea un nuevo producto
router.get("/editar/:id", productosCtrl.abmEdit);                                 // Muestra un producto para editarlo
router.put("/editar/:id", uploadMany, validateUpdate, productosCtrl.abmUpdate);   // Actualiza un producto
router.delete("/editar/:id", productosCtrl.abmDelete);                            // Elimina un producto

module.exports = router;