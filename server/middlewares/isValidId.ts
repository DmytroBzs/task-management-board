import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    return next(createHttpError(400, 'Invalid task ID format'));
  }

  next();
};
