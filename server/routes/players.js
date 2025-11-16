import express from "express";
import playerController from "../controllers/players.js";

const router = express.Router();

router.get("/", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerGameById);
router.post("/", playerController.createPlayer);
router.patch("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);


export default router;