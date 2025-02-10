import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { TasksCollection, TasksDocument } from '../db/models/tasks';

export const getAllTasks = async (): Promise<TasksDocument[]> => {
  const tasks = TasksCollection.find();
  return tasks;
};

export const getTaskById = async (
  taskId: string
): Promise<TasksDocument | null> => {
  const task = TasksCollection.findById(taskId);
  return task;
};

export const createTask = async (
  payload: Partial<TasksDocument>
): Promise<TasksDocument> => {
  const task = TasksCollection.create(payload);
  return task;
};

export const patchTask = async (
  taskId: string,
  payload: UpdateQuery<TasksDocument>,
  options: QueryOptions = {}
): Promise<{ task: TasksDocument; isNew: boolean } | null> => {
  const rawResult = await TasksCollection.findOneAndUpdate(
    { _id: taskId } as FilterQuery<TasksDocument>,
    payload,
    { new: true, upsert: true, ...options }
  );

  if (!rawResult) return null;

  return {
    task: rawResult,
    isNew: false,
  };
};

export const deleteTask = async (
  taskId: string
): Promise<TasksDocument | null> => {
  const task = TasksCollection.findOneAndDelete({
    _id: taskId,
  });
  return task;
};
