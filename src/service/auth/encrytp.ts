import bcryptjs from "bcryptjs";

export class EncryptManager {
  static async encryptPassword(password: string): Promise<string> {
    try {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      return hashedPassword;
    } catch (error: any) {
      throw new Error(`Falha ao Encryptar senha ${error}`);
    }
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      const isMatch = await bcryptjs.compare(password, hashedPassword);
      return isMatch as boolean;
    } catch (error) {
      throw new Error("Falha ao comparar as senhas");
    }
  }
}
