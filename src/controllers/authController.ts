import { Response, Request, NextFunction } from "express";
import { AuthService } from "../service/authService";
import { httpStatus } from "../utils/httpstatus";

export class AuthController {
  static async signupUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userAuth = await AuthService.createAuth(req.body);
    const { name, email } = userAuth;
    res.status(httpStatus.OK).json({ name, email });
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    const token = await AuthService.credentials(req.body);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(httpStatus.OK).json({ msg: "Acesso Liberado", token });
  }
}
