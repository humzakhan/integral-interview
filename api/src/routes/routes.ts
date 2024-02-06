import { HealthController, AccountsController } from "../controllers";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/health", HealthController.healthCheck);

router
  .route("/account")
  .post(AccountsController.createAccount)
  .get(AccountsController.getAccounts);

router
  .route("/account/:accountId")
  .get(AccountsController.getAccount);

router
  .route("/account/:accountId/wallet")
  .put(AccountsController.addWalletToAccount);

export default router;