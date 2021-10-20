var express = require('express');
var router = express.Router();
var controller = require("../controllers/testCtlr.js")



/* GET test page. */
router.get("/", controller.allRecords);

module.exports = router;