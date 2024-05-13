import express from "express";

const router = express.Router();

import authController from "./controllers/authController";
import homeController from "./controllers/homeController";

router.use("/auth", authController);
router.use("/home", homeController);

export default router;