import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { zodValidationMiddleware } from "../middleware/zodValidationMiddleware";
import { authLoginSchema, authSignupSchema } from "../mongooseSchemas/authSchema";
export const authRouter = Router();
authRouter.post(
  "/signup",
  zodValidationMiddleware(authSignupSchema),
  AuthController.signupUser
);
authRouter.post(
  "/login",
  zodValidationMiddleware(authLoginSchema),
  AuthController.loginUser
);
