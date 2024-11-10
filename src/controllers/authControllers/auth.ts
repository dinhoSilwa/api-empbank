import { Response, Request } from "express";
import { AuthService } from "../../service/auth/authService";

export class AuthController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const userAuth = await AuthService.createAuth(req.body);
      res.status(201).json({ auth: userAuth });
    } catch (error) {
      console.error("Falha ao Cadastrar", error);
      res.status(500).json({ msgErro: "Falha ao Cadastrar Usuário" });
    }
  }

  static async credentials(req: Request, res: Response): Promise<void> {
    const userCredentials = await AuthService.credentials(req.body);
    res.status(200).json({ userCredentials });
  }
}
