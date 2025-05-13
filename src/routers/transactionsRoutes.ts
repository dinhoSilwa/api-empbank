import { Router } from "express";
import { TransactionController } from "../controllers/transactionsController";
import { createTransactionSchema } from "../schemas/transactionsZodSchema";
import { zodValidationMiddleware } from "../middleware/validateDtoMiddleware";
export const transactionsRouter = Router();
transactionsRouter.post(
  "/transactions",
  zodValidationMiddleware(createTransactionSchema),
  TransactionController.create
);

transactionsRouter.get(
  "/transactions",
  TransactionController.getAllTransactions
);
