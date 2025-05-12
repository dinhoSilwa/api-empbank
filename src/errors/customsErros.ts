import { httpStatus } from "../utils/httpstatus";

export class CustomAppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFound extends CustomAppError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}

export class Unauthorized extends CustomAppError {
  constructor(message: string) {
    super(message, httpStatus.UNAUTHORIZED);
  }
}

export class BadRequest extends CustomAppError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}
export class Uprocessable extends CustomAppError {
  constructor(message: string) {
    super(message, httpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class DuplicateKeyError extends CustomAppError {
  constructor(
    public field: string,
    public value: any,
    message = `Já existe um registro com ${field}: ${value}`
  ) {
    super(message, httpStatus.CONFLICT);
  }
}
