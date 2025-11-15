import express from "express";
import solutionController from "../controllers/solutions.js";

const router = express.Router();

router.get("/:id", solutionController.getSolutionById);


export default router;