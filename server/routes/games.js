import express from "express";
import placeholderController from "../controllers/games.js";

const router = express.Router();

router.get("/", placeholderController.getAllGames);
router.get("/:game_id", placeholderController.getSingleGame);
// router.post("/:game_id", placeholderController.x);
router.delete("/:id", placeholderController.deleteGame);
router.patch("/:id", placeholderController.x);

export default router;
