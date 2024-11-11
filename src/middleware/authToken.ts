import jwt, { JwtPayload } from "jsonwebtoken";

export class TokenManager {
  private static instance: TokenManager;
  private secretKey: string;

  private constructor() {
    this.secretKey = process.env.JWT_SECRET_KEY!;
  }

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public generateToken(payload: object, expiresIn: string = "1h"): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  public decodeToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      console.error("Token validation error", error);
      return null;
    }
  }

  public decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      console.error("Token decoding error", error);
      return null;
    }
  }
}
