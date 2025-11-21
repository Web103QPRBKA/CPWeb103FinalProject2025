import express from 'express';
import cluesController from '../controllers/clues.js';


const router = express.Router();
router.get("/:id", cluesController.getCluesById);
router.post("/", cluesController.createClues);

export default router;