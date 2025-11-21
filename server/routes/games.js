import express from "express";
import gameController from "../controllers/games.js";

const router = express.Router();

router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameById);

export default router;
