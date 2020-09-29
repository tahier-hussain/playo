const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/posts");
const auth = require("../../middleware/auth");

router.post("/add", auth, postsController.create);

router.get("/get", postsController.get);

router.get("/upcoming-events-two", postsController.getUpcomingEventsTwo);

router.post("/upcoming-events", postsController.getUpcomingEvents);

router.post("/get-single-club-posts", auth, postsController.getSingleClubPosts);

router.post("/update-available-slots", auth, postsController.updateAvailableSlots);

router.get("/scheduled-games", auth, postsController.scheduledGames);

router.get("/get-user-posts", auth, postsController.getUserPost);

router.put("/update-post", auth, postsController.update);

router.delete("/delete-post", auth, postsController.delete);

module.exports = router;
