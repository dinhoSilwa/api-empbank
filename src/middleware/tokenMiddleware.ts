import { Request, Response, NextFunction } from "express";
import { TokenManager } from "../token/tokenManager";
import { NotFound, Unauthorized } from "../errors/customsErrors";

export class AuthMiddleware {
  private JWT: TokenManager;
  constructor() {
    this.JWT = TokenManager.getInstance();
  }

  public createToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { email, nome } = req.body;
    const createToken = this.JWT.generateToken({ email, nome });

    if (!createToken) {
      throw new Unauthorized("Acesso Negado");
    }
    const decode = this.JWT.encodeToken(createToken as string);
    req.user = decode;
    next();
  };

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
      if (!verify) next();
    } catch (erro) {
      throw new Unauthorized("Error ao verificar Token");
    }
  };
}
