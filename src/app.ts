import "express-async-errors";
import express, { Application, Request, Response } from "express";
import { corsMiddleware } from "./middleware/corsConfig";
import { authRouter } from "./routers/authRouters/auth";
import { ErrorHandler } from "./middleware/errorsMiddleware";
import { error } from "console";
import { NotFound } from "./errors/customsErrors";
import { httpStatus } from "./utils/httpstatus";
export const app: Application = express();
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ msg: "Api Conectada com sucesso", status: httpStatus.OK });
});
app.post("*", (req: Request, res: Response) => {
  throw new NotFound("Rota Não Encontrada");
});
app.use(ErrorHandler);
