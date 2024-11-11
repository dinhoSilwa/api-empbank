import { app } from "./app";
import { configDotenv } from "dotenv";
import { MongoDBConnection } from "./config/mongoDb/mongoDbConnect";

configDotenv();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const startServer = async () => {
  try {
    if (!uri) return console.error("Uri not found");
    const db = MongoDBConnection.getInstance();
    await db.connect(uri as string);
    app.listen(PORT, () => {
      console.log(`Server Running on Port : ${PORT}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server not Running", error);
      process.exit(1);
    } else {
      console.error("Sommething has wrong");
    }
  }
};
startServer();
