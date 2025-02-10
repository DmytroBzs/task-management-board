import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api';

interface Task {
  title: string;
  description?: string;
  status?: string;
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/tasks');
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occcurred');
      }
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async (taskId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`);

      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ title, description, status }: Task, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/tasks', {
        title,
        description,
        status,
      });
      console.log(response.data);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { _id, title, description, status }: Task & { _id: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.patch(`/tasks/${_id}`, {
        title,
        description,
        status,
      });
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, thunkAPI) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);
