import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boards/slice";
import tasksReducer from "./tasks/slice";

// Add API base URL configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
