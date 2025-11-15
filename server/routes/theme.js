import express from "express";
import themeController from "../controllers/theme.js";

const router = express.Router();

router.get("/:id", themeController.getThemeById);


export default router;