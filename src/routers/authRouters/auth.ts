import { Router } from "express";
import { AuthController } from "../../controllers/authControllers/auth";


export const authRouter = Router()

authRouter.post("/auth", AuthController.create)