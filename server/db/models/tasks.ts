import { timeStamp } from 'console';
import { Schema, model, Document } from 'mongoose';

export interface TasksDocument extends Document {
  title: string;
  description?: string;
  status: 'ToDo' | 'InProgress' | 'Done';
  createdAt: Date;
  updatedAt: Date;
}

const tasksSchema = new Schema<TasksDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['ToDo', 'InProgress', 'Done'],
      required: true,
    },
  },
  { timestamps: true }
);

export const TasksCollection = model('tasks', tasksSchema);
