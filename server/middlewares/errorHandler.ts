import { Request, Response, NextFunction } from 'express';
import createHttpError, { HttpError } from 'http-errors';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err instanceof Error ? err.message : 'Unknown error',
  });
};
