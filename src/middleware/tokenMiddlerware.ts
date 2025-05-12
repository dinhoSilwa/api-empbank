import { Request, Response, NextFunction } from "express";
import { TokenManager } from "../token/tokenManager";

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
    console.log("meu token aqui foi criado", createToken);
    if (!createToken) {
      res.status(404).json({ msg: "Acesso Negado , Token Vazio" });
      return;
    }

    try {
      const decode = this.JWT.encodeToken(createToken);
      req.user = decode;
      res.status(200).json({ decode });
      next();
    } catch (err) {
      res.status(404).json({ msg: "Falha ao Gerar o Token" });
      return;
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
      res.status(404).json({ msg: "Acesso Negado" });
      return;
    }

    try {
      const verify = this.JWT.verifyToken(token);
      if (!verify || verify.length === 0 || verify !== typeof "string")
        res.status(200).json({ msg: "Acesso Autorizado" });
      return;
      next();
    } catch (erro) {
      res.status(500).json({ msg: "Acesso Negado, Erro ao solicitar Token" });
      return;
    }
  };
}
