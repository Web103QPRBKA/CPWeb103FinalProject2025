import express from "express";
import themeController from "../controllers/themes.js";

const router = express.Router();

router.get("/", themeController.getAllThemes);
router.get("/:id", themeController.getThemeById);


export default router;