import bcryptjs from "bcryptjs";

export class EncryptManager {
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isMatch = await bcryptjs.compare(password, hashedPassword);
    return isMatch as boolean;
  }
}
