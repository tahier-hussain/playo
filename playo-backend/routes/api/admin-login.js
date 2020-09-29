const express = require("express");
const router = express.Router();
const adminLoginController = require("../../controllers/admin-login");

router.post("/", adminLoginController.login);

module.exports = router;
