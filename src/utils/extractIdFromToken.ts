import { IncomingHttpHeaders } from "http";
import { TokenManager } from "../token/tokenManager";
import { Unauthorized } from "../errors/customsErrors";

export const extractIdFromToken = (headers: IncomingHttpHeaders): string => {
  const token = headers["authorization"]?.split(" ")[1];
  const { id } = TokenManager.getInstance().verifyToken(token!);
  if (!id) throw new Unauthorized("Falha ao Obter Token");
  return id;
};
