import type { UserAuth } from "../../@types/auth/userTypes";
import { UserAuthModel } from "../../models/auth/schema";
import { TokenManager } from "../../token/tokenManager";
import { EncryptManager } from "./encrytp";

export class AuthService {
  static async createAuth(user: UserAuth): Promise<UserAuth> {
    const { name, email, password } = user;
    const hashedPassword = await EncryptManager.encryptPassword(password);
    const newUser = { name, email, password: hashedPassword };
    const userAuthSave = new UserAuthModel(newUser);
    return userAuthSave.save();
  }

  static async credentials(
    credentials: Pick<UserAuth, "email" | "password">
  ): Promise<any> {
    try {
      const { email, password } = credentials;
      const findUserByEmail = await UserAuthModel.findOne({ email });

      if (!findUserByEmail) {
        throw new Error("Falha ao Encontrar Email");
      }
      const isMatch = await EncryptManager.comparePassword(
        password,
        findUserByEmail.password
      );

      if (!isMatch) throw new Error("Senha incorreta");
      const { name, email: userEmail } = findUserByEmail;
      const manager = TokenManager.getInstance();
      const token = manager.generateToken({ name, userEmail });
      if (!token) {
        throw new Error("Falha ao Buscar Token");
      }
      return token;
    } catch (err) {
      console.error({ err });
    }
  }
}
