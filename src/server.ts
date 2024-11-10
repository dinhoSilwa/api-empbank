import { app } from "./app";
import { configDotenv } from "dotenv";
configDotenv();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
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
