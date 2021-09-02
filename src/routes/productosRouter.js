var express = require('express');
var router = express.Router();
var controller = require("../controllers/productosCtrl.js")

/* GET products page. */
router.get("/",controller.retrive);                // Muestra todos los productos para los clientes
router.get("/listar",controller.abmList);          // Muestra todos los productos para administrarlos
router.get("/crear",controller.abmCreate);         // Muestra el formulario para crear un nuevo producto
router.post("/crear",controller.abmInsert);        // Crea un nuevo producto
router.get("/editar/:id",controller.abmEdit);      // Muestra un producto para editarlo
router.put("/editar/:id",controller.abmUpdate);    // Actualiza un producto
router.delete("/editar/:id",controller.abmDelete); // Elimina un producto

module.exports = router;