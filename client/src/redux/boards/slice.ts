import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../types/types";
import {
  fetchBoards,
  createBoard,
  deleteBoard as deleteBoardAction,
} from "./operations";

interface BoardsState {
  items: Board[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  foundBoard: Board | null;
}

const initialState: BoardsState = {
  items: [],
  loading: false,
  error: null,
  searchQuery: "",
  foundBoard: null,
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.items = action.payload;
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      state.items.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((board) => board._id !== action.payload);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.items.findIndex(
        (board) => board._id === action.payload._id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (action.payload) {
        state.foundBoard =
          state.items.find((board) =>
            board.name.toLowerCase().includes(action.payload.toLowerCase()),
          ) || null;
      } else {
        state.foundBoard = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch boards";
      });

    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create board";
      });

    builder
      .addCase(deleteBoardAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBoardAction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (board) => board._id !== action.payload,
        );
        state.loading = false;
      })
      .addCase(deleteBoardAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete board";
      });
  },
});

export const {
  setBoards,
  addBoard,
  deleteBoard,
  updateBoard,
  setSearchQuery,
  setLoading,
  setError,
} = boardsSlice.actions;
export default boardsSlice.reducer;
