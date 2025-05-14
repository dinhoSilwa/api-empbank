import { Request, Response, NextFunction } from "express";
import { TokenManager } from "../token/tokenManager";
import { Unauthorized } from "../errors/customsErrors";

export class AuthMiddleware {
  private JWT: TokenManager;
  constructor() {
    this.JWT = TokenManager.getInstance();
  }

  public verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const headers = req.get("Authorization");
    const token = headers?.split(" ")[1];

    if (!token) {
      throw new Unauthorized("Acesso Negado");
    }

    try {
      const verify = this.JWT.verifyToken(token);
      if (verify) req.user = verify;
      next();
    } catch (erro) {
      throw new Unauthorized("Error ao verificar Token");
    }
  };
}
