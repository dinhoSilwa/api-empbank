import { MongoServerError, ObjectId } from "mongodb";
import { UserAuth } from "../@types/auth/userTypes";
import { UserAuthModel } from "../models/auth/schema";
import { EncryptManager } from "../utils/encrytp";
import { DuplicateKeyError } from "../errors/customsErrors";
import { TokenManager } from "../token/tokenManager";

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
    const newId: ObjectId | any = findUserByEmail._id;
    const manager = TokenManager.getInstance();
    const token = manager.generateToken({
      name,
      userEmail,
      id: newId.toString(),
    });
    if (!token) {
      throw new Error("Falha ao Buscar Token");
    }
    return token;
  }
}
