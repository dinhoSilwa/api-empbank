import express, { Application } from "express";
import { corsMiddleware } from "./middleware/corsConfig";
import { authRouter } from "./routers/authRouters/auth";
export const app: Application = express();
app.use(corsMiddleware);
app.use(express.json());
app.use('/api/auth', authRouter)
