import any from "typescript";
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
