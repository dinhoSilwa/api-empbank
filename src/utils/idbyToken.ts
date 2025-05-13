

import { TokenManager } from "../token/tokenManager";
export const idFromToken = (headers: any): string=> {
  const extractFromHeader = headers["authorization"]?.split(" ")[1];
  const { id } = TokenManager.getInstance().verifyToken(extractFromHeader);
  return id;
};
