import { Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (err: unknown, _req: Request, res: Response) => {
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
