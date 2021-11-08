var express = require('express');
var router = express.Router();
const controllerApi = require("../../controllers/api/usersApiCtrl.js");

// APIs
router.get("/", controllerApi.allUsers);
router.get("/:id", controllerApi.oneUser);

module.exports = router;