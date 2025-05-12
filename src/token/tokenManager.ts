import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const SECRET = process.env.JWT_SECRET_KEY as string;

export class TokenManager {
  private static instance: TokenManager;
  private secretKey: string;

  private constructor() {
    this.secretKey = SECRET || "";
    if (!this.secretKey) {
      throw new Error("Falha ao obter token");
    }
  }

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public generateToken(
    payload: object,
    expiresIn: string = "1h"
  ): string | null {
    try {
      return jwt.sign(payload, this.secretKey, { expiresIn });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha gerar Token ${error.message}`);
      }
      throw new Error("Falha ao gerar Token , erro desconhecido");
    }
  }

  public encodeToken(token: string): JwtPayload | null {
    try {
      if (!token) return null;
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Falha ao encodificar o Token ${error.message}`);
    }
    throw new Error("Falha ao encodificar o Token, erro desconhecido");
  }

  public verifyToken(token: string): JwtPayload | string | null {
    try {
      if (!token) return null;
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Falha ao verificar o Token ${error.message}`);
      }
      throw new Error("Falha ao verificar o Token");
    }
  }
}
