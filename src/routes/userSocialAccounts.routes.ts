import { Router } from "express";
import { UserSocialAccountsController } from "../controllers/userSocialAccounts.controller";

const router = Router();

// Your existing routes
router.post("/connect", UserSocialAccountsController.connectAccount);
router.get("/user/:user_id", UserSocialAccountsController.getAccountsByUser);

// ADD: New route to get OAuth URLs
router.get("/oauth-urls", UserSocialAccountsController.getOAuthUrls);

export default router;