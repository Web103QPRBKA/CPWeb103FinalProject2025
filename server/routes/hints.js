import express from "express";
import placeholderController from "../controllers/hints.js";

const router = express.Router();

router.get("/", placeholderController.getAllHints);
router.get("/:hint_id", placeholderController.getSingleHint);
// router.post("/:hint_id", placeholderController.x);
router.delete("/:id", placeholderController.deleteHint);
router.patch("/:id", placeholderController.x);

export default router;