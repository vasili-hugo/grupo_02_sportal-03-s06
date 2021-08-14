var express = require('express');
var router = express.Router();
var controller = require("../controllers/indexCtrl.js")

/* GET home page. */
router.get("/",controller.retrive);

module.exports = router;