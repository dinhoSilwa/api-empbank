import { model, Schema } from "mongoose";
import type { UserAuth } from "../../@types/auth/userTypes";

const UserAuthSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UserAuthModel = model<UserAuth>("authusers", UserAuthSchema);
