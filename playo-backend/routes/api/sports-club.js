const express = require("express");
const router = express.Router();
const sportsClubController = require("../../controllers/sportsClub");
const auth = require("../../middleware/auth");

router.post("/add", auth, sportsClubController.create);

router.get("/get", sportsClubController.get);

router.post("/get-one", auth, sportsClubController.getOne);

router.put("/update-post", auth, sportsClubController.update);

router.delete("/delete-post", auth, sportsClubController.delete);

module.exports = router;
