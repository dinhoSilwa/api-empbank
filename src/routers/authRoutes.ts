import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { zodValidationMiddleware } from "../middleware/zodValidationMiddleware";
import { authSignupSchema } from "../mongooseSchemas/authSchema";
export const authRouter = Router();
authRouter.post(
  "/signup",
  zodValidationMiddleware(authSignupSchema),
  AuthController.signupUser
);
authRouter.post(
  "/login",
  zodValidationMiddleware(authSignupSchema),
  AuthController.loginUser
);
