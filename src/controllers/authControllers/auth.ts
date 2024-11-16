import { Response, Request } from "express";
import { AuthService } from "../../service/auth/authService";
import { emit } from "process";

export class AuthController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const userAuth = await AuthService.createAuth(req.body);
      const { name, email } = userAuth;
      res.status(201).json({ name, email });
    } catch (error) {
      console.error("Falha ao Cadastrar", error);
      res.status(500).json({ msgErro: `Falha ao Cadastrar Usuário ${error}` });
    }
  }

  static async credentials(req: Request, res: Response): Promise<void> {
    try {
      const userCredentials = await AuthService.credentials(req.body);
      res.status(200).json({ userCredentials });
    } catch (error) {
      res.send(404).json({ msgError: `Falha ao Credenciar ${error}` });
    }
  }
}
