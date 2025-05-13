import { Request, Response, NextFunction } from "express";
import { httpStatus } from "../utils/httpstatus";
import { TransactionService } from "../service/transactionsService";
import { TokenManager } from "../token/tokenManager";
import { idFromToken } from "../utils/idbyToken";

export class TransactionController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = idFromToken(req.headers);
    const transactions = await TransactionService.create(id, req.body);
    res.status(httpStatus.OK).json({ transactions });
  }

  static async getAllTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const transactions = await TransactionService.get(idFromToken(req.headers));
    res.status(httpStatus.OK).json({ transactions });
  }
}
