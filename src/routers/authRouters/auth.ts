import { Router } from "express";
import { AuthController } from "../../controllers/authControllers/auth";

export const authRouter = Router();

authRouter.post("/sigup", AuthController.create);
authRouter.post("/login", AuthController.credentials);
