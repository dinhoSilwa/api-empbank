import "express-async-errors";
import express, { Application, Request, Response } from "express";
import { corsMiddleware } from "./middleware/corsConfig";
import { authRouter } from "./routers/authRoutes";
import { ErrorHandler } from "./middleware/errorsMiddleware";
import { error } from "console";
import { NotFound } from "./errors/customsErrors";
import { httpStatus } from "./utils/httpstatus";
import { transactionsRouter } from "./routers/transactionsRoutes";
import { AuthMiddleware } from "./middleware/tokenMiddleware";
import { limitHard, limitSuite } from "./middleware/rateLimit";
export const app: Application = express();
const auth = new AuthMiddleware();
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", limitHard, authRouter);
app.use("/api", auth.verifyToken, limitSuite, transactionsRouter);
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ msg: "Api Conectada com sucesso", status: httpStatus.OK });
});
app.post("*", (req: Request, res: Response) => {
  throw new NotFound("Rota Não Encontrada");
});
app.use(ErrorHandler);
