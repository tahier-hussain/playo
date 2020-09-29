const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth-user");
const auth = require("../../middleware/auth");

router.get("/get", auth, authController.get);

router.post("/update", auth, authController.update);

module.exports = router;
