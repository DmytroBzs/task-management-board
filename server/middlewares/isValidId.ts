import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { studentId } = req.params;
  if (!isValidObjectId(studentId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
