import { Request, Response, NextFunction } from "express";
import rateLimit, { Options } from "express-rate-limit";
import { BadRequest } from "../errors/customsErrors";

const createRateLimitMiddleware = (
  windowMs: number,
  max: number,
  message: string
) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (
      req: Request,
      res: Response,
      next: NextFunction,
      options: Options
    ) => {
      next(new BadRequest(message));
    },
  });
};

export const limitHard = createRateLimitMiddleware(
  15 * 60 * 1000,
  5,
  "Muitas tentativas. Tente novamente em 15 minutos."
);

export const limitSuite = createRateLimitMiddleware(
  30 * 60 * 1000,
  100,
  "Muitas tentativas. Tente novamente em 30 minutos."
);
