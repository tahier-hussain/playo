const express = require("express");
const router = express.Router();
const adminRegisterController = require("../../controllers/admin-register");

router.post("/", adminRegisterController.register);

module.exports = router;
