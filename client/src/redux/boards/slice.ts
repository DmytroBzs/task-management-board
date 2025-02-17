import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Card } from "../../types/types";
import {
  fetchBoards,
  createBoard,
  deleteBoard as deleteBoardAction,
  fetchBoardById,
} from "./operations";
import { addCard, deleteCard, updateCard } from "../tasks/operations";

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
      state.foundBoard = action.payload
        ? state.items.find((board) =>
            board.name.toLowerCase().includes(action.payload.toLowerCase()),
          ) || null
        : null;
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
      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.foundBoard = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch board";
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
      })
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
      })
      .addCase(addCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCard.fulfilled, (state, action: PayloadAction<Card>) => {
        const board = state.items.find(
          (board) => board._id === action.payload.boardId,
        );
        if (board) {
          const column = board.columns.find(
            (col) => col.id === action.payload.status,
          );
          if (column) {
            column.cards.push(action.payload);
          }
          state.loading = false;
        }
      })
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCard.fulfilled, (state, action: PayloadAction<Card>) => {
        const { boardId, status: newColumnId, _id: cardId } = action.payload;
        const boardIndex = state.items.findIndex(
          (board) => board._id === boardId,
        );
        if (boardIndex === -1) return;

        const board = state.items[boardIndex];
        let prevColumnIndex = -1;
        let newColumnIndex = -1;

        board.columns.forEach((column, colIndex) => {
          const cardIndex = column.cards.findIndex(
            (card) => card._id === cardId,
          );
          if (cardIndex !== -1) {
            prevColumnIndex = colIndex;
          }
          if (column.id === newColumnId) {
            newColumnIndex = colIndex;
          }
        });

        if (newColumnIndex === -1) return;

        const updatedColumns = board.columns.map((column, colIndex) => {
          if (colIndex === prevColumnIndex) {
            return {
              ...column,
              cards: column.cards.filter((card) => card._id !== cardId),
            };
          }
          if (colIndex === newColumnIndex) {
            return {
              ...column,
              cards: [
                ...column.cards.filter((card) => card._id !== cardId),
                action.payload,
              ].sort((a, b) => a.order - b.order),
            };
          }
          return column;
        });

        state.items = state.items.map((boardItem, index) =>
          index === boardIndex
            ? { ...boardItem, columns: updatedColumns }
            : boardItem,
        );

        state.loading = false;
      })

      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        deleteCard.fulfilled,
        (
          state,
          action: PayloadAction<{
            cardId: string;
            columnId: string;
            boardId: string;
          }>,
        ) => {
          state.items = state.items.map((board) => {
            if (board._id !== action.payload.boardId) return board;
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.id !== action.payload.columnId) return column;
                return {
                  ...column,
                  cards: column.cards.filter(
                    (card) => card._id !== action.payload.cardId,
                  ),
                };
              }),
            };
          });
          state.loading = false;
        },
      );
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
