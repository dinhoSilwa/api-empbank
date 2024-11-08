import cors from "cors";

if (!process.env.NODE_ENV || !process.env.URL_DOMAIN) {
  throw new Error("Environment variable process.env.URL_DOMAIN is not defined");
}

const domain =
  process.env.NODE_ENV === "production" ? process.env.URL_DOMAIN : "*";

export const corsOptions = cors({
  origin: domain,
  methods: "GET,POST,DELETE,PATCH",
  credentials: true,
  allowedHeaders : ["Content-Type", "Authorization"]
});
