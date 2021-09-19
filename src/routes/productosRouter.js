const express = require('express');
const router = express.Router();
const productosCtrl = require("../controllers/productosCtrl.js");
const uploadMany = require('../middlewares/productoImages.js');
const productoValidate = require("../middlewares/productoValid.js");
const productoCtrl = require("../controllers/productoCtrl.js");

/* GET products page. */
router.get("/:id", productosCtrl.retrive);                                        // Muestra todos los productos correspondientes a ese rubro
router.get("/detail/:id",productoCtrl.retrive);                                   // Muestra un producto.
router.post("/crear", uploadMany, productoValidate, productosCtrl.abmInsert);     // Crea un nuevo producto
router.get("/editar/:id", productosCtrl.abmEdit);                                 // Muestra un producto para editarlo
router.put("/editar/:id", uploadMany, productoValidate, productosCtrl.abmUpdate); // Actualiza un producto
router.delete("/editar/:id", productosCtrl.abmDelete);                            // Elimina un producto

module.exports = router;