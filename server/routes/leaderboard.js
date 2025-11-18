import express from "express";
import leaderboardController from "../controllers/leaderboard.js";

const router = express.Router();

router.get("/", leaderboardController.getLeaderboard);
router.get("/:gameId", leaderboardController.getLeaderboardByGame);

export default router;