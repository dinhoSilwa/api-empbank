import "express-async-errors";
import express, { Application, Request, Response } from "express";
import { corsMiddleware } from "./middleware/corsConfig";
import { authRouter } from "./routers/authRouters/auth";
import { ErrorHandler } from "./middleware/errorsMiddleware";
import { error } from "console";
export const app: Application = express();
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.get("*", (req: Request, res: Response) => {
  res.status(500).json({ msg: "Rota não encontrada" });
});
app.use(ErrorHandler);
