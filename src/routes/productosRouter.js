var express = require('express');
var router = express.Router();
var controller = require("../controllers/productosCtrl.js")

/* GET products page. */
router.get("/:id",controller.retrive);
router.get("/",controller.retrive);

module.exports = router;