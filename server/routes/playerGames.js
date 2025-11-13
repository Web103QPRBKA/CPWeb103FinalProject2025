import express from "express";
import placeholderController from "../controllers/playersGames.js";

const router = express.Router();

router.get("/", placeholderController.getPlayerAllGames);
router.get("/:game_id", placeholderController.getPlayerSingleGame);
// router.post("/:player_id", placeholderController.x);
router.delete("/:id", placeholderController.deletePlayerGame);
router.patch("/:id", placeholderController.x);

export default router;