import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { configDotenv } from "dotenv";
import {
  BadRequest,
  TokenExpired,
  Unauthorized,
} from "../errors/customsErrors";
configDotenv();

const SECRET = process.env.JWT_SECRET_KEY as string;

export class TokenManager {
  private static instance: TokenManager;
  private secretKey: string;

  private constructor() {
    this.secretKey = SECRET || "";
    if (!this.secretKey) {
      throw new Unauthorized("Falha ao obter token");
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
    expiresIn: string = process.env.NODE_ENV === "production" ? "8h" : "1h"
  ): string | Error {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  public encodeToken(token: string): JwtPayload | Error | string {
    return jwt.decode(token) as JwtPayload;
  }

  public verifyToken(token: string): JwtPayload | string | null | any {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new TokenExpired("Token expirado.");
      }
      if (err instanceof JsonWebTokenError) {
        throw new BadRequest("Token inválido.");
      }
      throw new BadRequest("Erro Desconhecido");
    }
  }
}
