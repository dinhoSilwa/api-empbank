import { ITransactions } from "./transactions/transactions";

declare global {
  namespace Express {
    interface Request {
      validateData: ITransactions;
    }
  }
}
