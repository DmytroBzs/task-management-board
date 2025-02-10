import createHttpError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

import {
  getAllTasks,
  getTaskById,
  createTask,
  patchTask,
  deleteTask,
} from '../services/tasks';

export const getTasksController = async (req: Request, res: Response) => {
  const tasks = await getAllTasks();

  res.status(200).json({
    status: 200,
    message: 'Successfully found tasks!',
    data: tasks,
  });
};

export const getTaskByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const task = await getTaskById(taskId);

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found task with id ${taskId}!`,
    data: { task },
  });
};

export const createTaskController = async (req: Request, res: Response) => {
  const task = await createTask(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created task!',
    data: task,
  });
};

export const patchTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const result = await patchTask(taskId, req.body);

  if (!result) {
    next(createHttpError(404, 'Task not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a task!',
    data: result.task,
  });
};

export const deleteTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const task = await deleteTask(taskId);

  if (!task) {
    next(createHttpError(404, 'Task not found'));
    return;
  }
  res.status(204).send();
};
