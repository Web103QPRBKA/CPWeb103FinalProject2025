import express from 'express';
import cluesController from '../controllers/clues.js';


const router = express.Router();
router.get("/:id", cluesController.getCluesById);

export default router;