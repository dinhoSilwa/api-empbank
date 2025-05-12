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

    try {
      const decode = this.JWT.encodeToken(createToken);
      req.user = decode;
      next();
    } catch (err) {
      throw new NotFound("Ocorreu um Erro");
    }
  };

  public verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const headers = req.get("Authorization");
    const token = headers?.split(" ")[1];

    if (!token || token.length === 0 || token !== typeof "string") {
      throw new Unauthorized("Acesso Negado");
    }

    try {
      const verify = this.JWT.verifyToken(token);
      if (!verify || verify.length === 0 || verify !== typeof "string") next();
    } catch (erro) {
      throw new Unauthorized("Error ao verificar Token");
    }
  };
}
