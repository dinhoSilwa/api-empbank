import { Router } from "express";
import { TransactionController } from "../controllers/transactionsController";
import { createTransactionSchema } from "../mongooseSchemas/transactionsZodSchema";
import { zodValidationMiddleware } from "../middleware/zodValidationMiddleware";
export const transactionsRouter = Router();
transactionsRouter.post(
  "/transactions",
  zodValidationMiddleware(createTransactionSchema),
  TransactionController.initiateTransaction
);

transactionsRouter.get(
  "/transactions",
  TransactionController.getUserTransactions
);
