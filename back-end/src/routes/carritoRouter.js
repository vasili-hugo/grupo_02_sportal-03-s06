var express = require('express');
var router = express.Router();
var controller = require("../controllers/carritoCtrl.js")

/* GET users stand-by buys. */
router.get("/",controller.retrive);

module.exports = router;