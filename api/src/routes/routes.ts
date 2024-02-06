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
  .get(AccountsController.getAccount)
  .put(AccountsController.updateAccount);

router
  .route("account/:accountId/transactions")
  .get(AccountsController.getAccountTransactions);

export default router;