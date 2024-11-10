import type { UserAuth } from "../../@types/auth/userTypes";
import { UserAuthModel } from "../../models/auth/schema";
import { EncryptManager } from "./encrytp";

export class AuthService {
  static async createAuth(user: UserAuth): Promise<UserAuth | any> {
    const { name, email, password, role } = user;
    const hashedPassword = await EncryptManager.encryptPassword(password);
    const newUser = { name, email, password: hashedPassword, role };
    const userAuthSave = new UserAuthModel(newUser);
    return userAuthSave.save();
  }

  static async credentials(
    credentials: Pick<UserAuth, "email" | "password">
  ): Promise<boolean> {
    const { email, password } = credentials;
    const findEmail = await UserAuthModel.findOne({ email });
    if (!findEmail) {
      return false;
    }
    const { password: hashedPassword } = findEmail;
    const isMatch = EncryptManager.comparePassword(password, hashedPassword);
    return isMatch;
  }
}
