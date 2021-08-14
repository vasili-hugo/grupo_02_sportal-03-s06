var express = require('express');
var router = express.Router();
var controller = require("../controllers/loginCtrl.js")

/* GET login page. */
router.get("/user-restore",controller.forgotUser);
router.get("/pass-restore",controller.forgotPass);
router.get("/",controller.retrive);

module.exports = router;