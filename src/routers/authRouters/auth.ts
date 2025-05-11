import { Router } from "express";
import { AuthController } from "../../controllers/authControllers/auth";
import { AuthMiddleware } from "../../middleware/tokenMiddlerware";

export const authRouter = Router();
const tokenMiddlerware = new AuthMiddleware();

authRouter.post("/sigup", AuthController.create);
authRouter.post("/login", AuthController.credentials);
