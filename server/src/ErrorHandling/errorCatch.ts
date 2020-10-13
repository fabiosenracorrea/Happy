import { Request, Response, NextFunction } from 'express';

import AppError from '../Errors/AppError';

export default function errorCatcher(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // if its not an app error, we need to debug it
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
