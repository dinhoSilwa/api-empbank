import type { UserAuth } from "../../@types/auth/userTypes";
import { TokenManager } from "../../middleware/tokenMiddlerware";
import { UserAuthModel } from "../../models/auth/schema";
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
    const { email, password } = credentials;
    const findUserByEmail = await UserAuthModel.findOne({ email });
    if (!findUserByEmail) return { msg: "Not Found Email" };
    const isMatch = await EncryptManager.comparePassword(
      password,
      findUserByEmail.password
    );

    if (!isMatch) return { msg: "Senha incorreta" };
    const { name, email: userEmail } = findUserByEmail;
    return findUserByEmail;

    // a logica de criação do token deve ser movida para o middleware
    // const token = TokenManager.getInstance();

    // return token.generateToken({ name, userEmail });
  }
}
