import { type Document } from "mongoose";
export interface ITransactions {
  title: string;
  amount: number;
  category: string;
  transactionType: "income" | "exprense";
  day: string;
  trans?: string
}

export type ItransactionType = ITransactions & Document
