import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCardById,
  fetchCards,
  addCard,
  updateCard,
  deleteCard,
} from "./operations";
import { Card } from "../../types/types";

interface TasksState {
  tasks: Card[];
  foundTask: Card | null;
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
      .addCase(fetchCards.pending, handlePending)
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<Card[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchCards.rejected, handleRejected)

      .addCase(fetchCardById.pending, handlePending)
      .addCase(
        fetchCardById.fulfilled,
        (state, action: PayloadAction<Card>) => {
          state.loading = false;
          state.foundTask = action.payload;
        },
      )
      .addCase(fetchCardById.rejected, handleRejected)
      .addCase(addCard.pending, handlePending)
      .addCase(addCard.fulfilled, (state, action: PayloadAction<Card>) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(addCard.rejected, handleRejected)
      .addCase(updateCard.pending, handlePending)
      .addCase(updateCard.fulfilled, (state, action: PayloadAction<Card>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        } else {
          state.tasks.push(action.payload);
        }
      })
      .addCase(updateCard.rejected, handleRejected)
      .addCase(deleteCard.pending, handlePending)
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteCard.rejected, handleRejected);
  },
});

export default tasksSlice.reducer;
