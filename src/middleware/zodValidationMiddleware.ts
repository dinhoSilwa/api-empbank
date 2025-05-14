import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { UnfilledFiels } from "../errors/customsErrors";
import { formatterZodError } from "../utils/formatZodErrors";

export const zodValidationMiddleware = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new UnfilledFiels(formatterZodError(result.error.issues));
    }
    req.validateData = result.data;
    next();
  };
};
