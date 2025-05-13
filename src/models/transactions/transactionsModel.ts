import mongoose, { model, Schema } from "mongoose";
import { ItransactionType } from "../../@types/transactions/transactions";

export const TransactionMongooseSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    transactionType: { type: String, required: true },
    day: { type: String, required: true },
    trans: { type: mongoose.Schema.Types.ObjectId, ref: "authusers" },
  },
  {
    timestamps: true,
  }
);

export const TransactionModel = model<ItransactionType>(
  "transactions",
  TransactionMongooseSchema
);
