import express from "express";
import placeholderController from "../controllers/solutions.js";

const router = express.Router();

router.get("/", placeholderController.getAllGameSolutions);
router.get("/:solution_id", placeholderController.getSingleGameSolution);


export default router;