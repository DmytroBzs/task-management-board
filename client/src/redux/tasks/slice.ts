import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTaskById,
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./operations";

interface Task {
  task: { _id: string; title: string; description: string; status: string };
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  foundTask: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  foundTask: null,
  loading: false,
  error: null,
};

const handlePending = (state: TasksState) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: TasksState, action: PayloadAction<unknown>) => {
  state.loading = false;
  state.error =
    typeof action.payload === "string" ? action.payload : "An error occurred";
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, handleRejected)

      .addCase(fetchTaskById.pending, handlePending)
      .addCase(
        fetchTaskById.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          state.foundTask = action.payload;
        },
      )
      .addCase(fetchTaskById.rejected, handleRejected)
      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, handleRejected)
      .addCase(updateTask.pending, handlePending)
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, handleRejected)
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, handleRejected);
  },
});

export default tasksSlice.reducer;
