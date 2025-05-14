import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../utils/httpstatus";
import { TransactionService } from "../service/transactionsService";
import { extractIdFromToken } from "../utils/extractIdFromToken";

export class TransactionController {
  static async initiateTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = extractIdFromToken(req.headers);
    await TransactionService.create(id, req.body);
    res.status(httpStatus.OK).json({ success: "OK" });
  }

  static async getUserTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const transactions = await TransactionService.get(
      extractIdFromToken(req.headers)
    );
    res.status(httpStatus.OK).json({ transactions });
  }
}
