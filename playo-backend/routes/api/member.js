const express = require("express");
const router = express.Router();
const memberController = require("../../controllers/member");
const auth = require("../../middleware/auth");

router.post("/add", auth, memberController.create);

router.get("/get", memberController.get);

router.delete("/delete-post", auth, memberController.delete);

module.exports = router;
