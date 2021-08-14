var express = require('express');
var router = express.Router();
var controller = require("../controllers/abmProductosCtrl.js")

/* GET abm productos. */
router.get("/retrive/:id",controller.retrive);
router.get("/update/:id",controller.update);
router.get("/delete/:id",controller.delete);
router.get("/insert/:id",controller.insert);
router.get("/",controller.retriveAll);

module.exports = router;