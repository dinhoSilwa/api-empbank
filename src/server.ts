import express, { Response, Request } from "express";
import { app } from "./app";
import { configDotenv } from "dotenv";
import { MongoDBConnection } from "./config/mongoDb/mongoDbConnect";
import { NotFound } from "./errors/customsErrors";

configDotenv();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const startServer = async () => {
  if (!uri) return console.error("Uri not found");
  const db = MongoDBConnection.getInstance();
  await db.connect(uri as string);
  app.use("*", (req: Request, res: Response) => {
    throw new NotFound("Rota não encontrada");
  });
  app.listen(PORT, () => {
    console.log(`Server Running on Port : ${PORT}`);
  });
};
startServer();
