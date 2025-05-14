import { IncomingHttpHeaders } from "http";
import { TokenManager } from "../token/tokenManager";

export const extractIdFromToken = (headers: IncomingHttpHeaders): string => {
  const token = headers["authorization"]?.split(" ")[1];
  const { id } = TokenManager.getInstance().verifyToken(token!);
  return id;
};
