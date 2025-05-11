import { Response, Request } from "express";
import { AuthService } from "../../service/auth/authService";
import { TokenManager } from "../../token/tokenManager";

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
      const token = await AuthService.credentials(req.body);
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ msg: "Acesso Liberado" });
    } catch (error) {
      res.status(404).json({ msgError: `Falha ao Credenciar ${error}` });
    }
  }
}
