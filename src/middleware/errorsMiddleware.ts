import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import {
  CustomAppError,
  DuplicateKeyError,
  UnfilledFiels,
} from "../errors/customsErrors";
import { TokenExpiredError } from "jsonwebtoken";

export const ErrorHandler: ErrorRequestHandler = (
  error: Error & CustomAppError,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const statusCode = error instanceof CustomAppError ? error.statusCode : 500;
  const message = error.message ? error.message : "Internal Server Error";
  console.error(`[${new Date().toISOString()}] Error : `, error);

  // ErrorHandler.ts
  if (error instanceof DuplicateKeyError) {
    return res.status(error.statusCode).json({
      error: {
        status: error.statusCode,
        message: error.message,
        details: {
          field: error.field,
          value: error.value,
          suggestion: `Escolha um ${error.field} diferente`,
        },
      },
    });
  }

  if (error instanceof UnfilledFiels) {
    return res.status(error.statusCode).json({
      error: {
        status: error.statusCode,
        message: "Campos Obrigatórios inválidos",
        fields: error.ErrorOject,
      },
    });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(error.statusCode).json({
      error: {
        status: error.statusCode,
        message: error.message,
      },
    });
  }
  return res.status(statusCode).json({
    error: {
      statusCode: error.statusCode,
      msg: message,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
  });
};
