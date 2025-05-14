import cors, { CorsOptions } from "cors";
const corsOptions: CorsOptions = {
  origin: "*",
  methods: "GET,POST,DELETE,PATCH",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
};

export const corsMiddleware = cors(corsOptions);
