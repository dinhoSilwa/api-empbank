import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { zodValidationMiddleware } from "../middleware/validateDtoMiddleware";
import { createAuthZodSchema } from "../schemas/authSchemaZod";
export const authRouter = Router();
authRouter.post(
  "/signup",
  zodValidationMiddleware(createAuthZodSchema),
  AuthController.create
);
authRouter.post("/login", AuthController.credentials);
