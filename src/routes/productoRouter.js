var express = require('express');
var router = express.Router();
var controller = require("../controllers/productoCtrl.js")

/* GET producto. */
router.get("/:id",controller.retrive);

module.exports = router;