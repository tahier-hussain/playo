const express = require("express");
const router = express.Router();
const sportController = require("../../controllers/sport");
const auth = require("../../middleware/auth");

router.post("/add", auth, sportController.create);

router.get("/get", sportController.get);

router.put("/update-post", auth, sportController.update);

router.delete("/delete-post", auth, sportController.delete);

module.exports = router;
