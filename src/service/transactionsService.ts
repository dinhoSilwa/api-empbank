import { ITransactions } from "../@types/transactions/transactions";
import { TransactionModel } from "../models/UserTransactionSchema";

export class TransactionService {
  static async create(id: string, transaction: ITransactions) {
    transaction.trans = id;
    const newTransaction = new TransactionModel(transaction);
    await newTransaction.save();
  }

  static async get(id: string): Promise<any> {
    const transaction = await TransactionModel.find({
      trans: id,
    });
    return transaction;
  }
}
