import type { UserAuth } from "../../@types/auth/userTypes";
import { UserAuthModel } from "../../models/auth/schema";
import { EncryptManager } from "./encrytp";

export class AuthService {
  static async createAuth(user: UserAuth): Promise<UserAuth> {
    const { name, email, password, role } = user;
    const hashedPassword = await EncryptManager.encryptPassword(password);
    const newUser = { name, email, password: hashedPassword, role };
    const userAuthSave = new UserAuthModel(newUser);
    return userAuthSave.save();
  }

  static async credentials(
    credentials: Pick<UserAuth, "email" | "password">
  ): Promise<any> {
    const { email, password } = credentials;
    const findUserByEmail = await UserAuthModel.findOne({ email });
    if (!findUserByEmail) return { msg: "Not Found Email" };
    const isMatch = await EncryptManager.comparePassword(
      password,
      findUserByEmail.password
    );

    if (!isMatch) return { mag: "Senha incorreta" };
    const { name, email: userEmail } = findUserByEmail;

    return {
      name,
      userEmail,
    };
  }
}
