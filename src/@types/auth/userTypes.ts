import { Document } from "mongoose";
export interface UserAuth extends Document {
  name: string;
  role: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
