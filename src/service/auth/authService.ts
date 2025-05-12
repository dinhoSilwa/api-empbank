import { MongoServerError } from "mongodb";
import type { UserAuth } from "../../@types/auth/userTypes";
import { DuplicateKeyError } from "../../errors/customsErros";
import { UserAuthModel } from "../../models/auth/schema";
import { TokenManager } from "../../token/tokenManager";
import { EncryptManager } from "./encrytp";

export class AuthService {
  static async createAuth(user: UserAuth): Promise<UserAuth | any> {
    const { name, email, password } = user;
    const hashedPassword = await EncryptManager.encryptPassword(password);
    const newUser = { name, email, password: hashedPassword };
    const userAuthSave = new UserAuthModel(newUser);

    try {
      return await userAuthSave.save();
    } catch (error) {
      if (this.isDuplicateKeyError(error)) {
        throw this.formatDuplicateKeyError(error);
      }
      throw error;
    }
  }

  private static isDuplicateKeyError(
    error: unknown
  ): error is MongoServerError {
    return error instanceof MongoServerError && error.code === 11000;
  }

  private static formatDuplicateKeyError(error: MongoServerError) {
    const [[field, value]] = Object.entries(error.keyValue);
    const message = `O ${field} '${value}' já está cadastrado em nosso sistema`;
    return new DuplicateKeyError(field, value, message);
  }

  static async credentials(
    credentials: Pick<UserAuth, "email" | "password">
  ): Promise<any> {
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
  }
}
