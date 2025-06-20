import { Router } from "express";
import { UserSocialAccountsController } from "../controllers/userSocialAccounts.controller";

const router = Router();

// Connect Social Media Account
router.post("/connect", UserSocialAccountsController.connectAccount);

// Get All Social Media Accounts for a User
router.get("/user/:user_id", UserSocialAccountsController.getAccountsByUser);

export default router;