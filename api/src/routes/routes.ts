import { HealthController } from "../controllers";
import express, { Router } from "express";

const router: Router = express.Router();
router.get("/health", HealthController.healthCheck);

export default router;