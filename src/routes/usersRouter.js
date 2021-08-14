var express = require('express');
var router = express.Router();
var controller = require("../controllers/usersCtrl.js")

/* GET users listing. */
router.get("/",controller.retrive);

module.exports = router;