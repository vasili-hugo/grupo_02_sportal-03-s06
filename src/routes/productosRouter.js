const express = require('express');
const router = express.Router();
const controller = require("../controllers/productosCtrl.js");
const uploadMany = require('../middlewares/productoImages.js');
const productoValidate = require("../middlewares/productoValid.js");

/* GET products page. */
router.get("/:id", controller.retrive);                                        // Muestra todos los productos correspondientes a ese rubro                                   // Muestra todos los productos para administrarlos
router.post("/crear", uploadMany, productoValidate, controller.abmInsert);     // Crea un nuevo producto
router.get("/editar/:id", controller.abmEdit);                                 // Muestra un producto para editarlo
router.put("/editar/:id", uploadMany, productoValidate, controller.abmUpdate); // Actualiza un producto
router.delete("/editar/:id", controller.abmDelete);                            // Elimina un producto

module.exports = router;