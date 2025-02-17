import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board, ServerResponse } from "../../types/types";
import axiosInstance from "../../api";

export const fetchBoards = createAsyncThunk<Board[]>(
  "boards/fetchBoards",
  async () => {
    const response = await axiosInstance.get<ServerResponse<Board[]>>("boards");
    return response.data.data;
  },
);

export const fetchBoardById = createAsyncThunk<Board, string>(
  "boards/fetchBoardById",
  async (boardId: string) => {
    const response = await axiosInstance.get<ServerResponse<Board>>(
      `/boards/${boardId}`,
    );
    return response.data.data;
  },
);

export const createBoard = createAsyncThunk<Board, string>(
  "boards/createBoard",
  async (name: string) => {
    const response = await axiosInstance.post<ServerResponse<Board>>("boards", {
      name,
    });
    return response.data.data;
  },
);

export const deleteBoard = createAsyncThunk<string, string>(
  "boards/deleteBoard",
  async (boardId: string) => {
    await axiosInstance.delete(`/boards/${boardId}`);
    return boardId;
  },
);
