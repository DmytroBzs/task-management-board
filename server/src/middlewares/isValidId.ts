import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { taskId, boardId } = req.params;

  if (taskId && !isValidObjectId(taskId)) {
    return next(createHttpError(400, "Invalid task ID format"));
  }

  if (boardId && !isValidObjectId(boardId)) {
    return next(createHttpError(400, "Invalid board ID format"));
  }

  next();
};
