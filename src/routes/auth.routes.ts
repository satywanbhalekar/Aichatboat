import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

// Instagram OAuth routes
router.get("/instagram", AuthController.redirectToInstagram);
router.get("/instagram/callback", AuthController.handleInstagramCallback);

// LinkedIn OAuth routes  
router.get("/linkedin", AuthController.redirectToLinkedIn);
router.get("/linkedin/callback", AuthController.handleLinkedInCallback);

export default router;
