import express from "express";
import placeholderController from "../controllers/players.js";

const router = express.Router();

router.get("/", placeholderController.getAllPlayers);
router.get("/:player_id", placeholderController.getSinglePlayer);
// router.post("/:player_id", placeholderController.x);
router.delete("/:id", placeholderController.deletePlayer);
router.patch("/:id", placeholderController.x);

export default router;