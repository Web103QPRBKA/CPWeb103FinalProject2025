import express from "express";
import hintsController from "../controllers/hints.js";

const router = express.Router();

router.get("/:id", hintsController.getHintsById);
router.post("/", hintsController.createHints);

export default router;