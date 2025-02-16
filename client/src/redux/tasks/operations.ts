import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api";
import { Card } from "../../types/types";

interface CreateCardData {
  title: string;
  description: string;
  order: number;
  boardId: string;
  columnId: string;
}

export const fetchCards = createAsyncThunk(
  "cards/fetchAll",
  async (
    { boardId, columnId }: { boardId: string; columnId: string },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.get(
        `/boards/${boardId}/columns/${columnId}/cards`,
      );
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const fetchCardById = createAsyncThunk(
  "cards/fetchById",
  async (cardId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/cards/${cardId}`);
      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const addCard = createAsyncThunk<Card, CreateCardData>(
  "cards/addCard",
  async (cardData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/boards/${cardData.boardId}/columns/${cardData.columnId}/cards`,
        {
          title: cardData.title,
          description: cardData.description,
          order: cardData.order,
        },
      );

      if (Array.isArray(response.data.data)) {
        return thunkAPI.fulfillWithValue(response.data.data);
      }

      return response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (
    { _id, title, description, order, status, boardId, columnId }: Card,
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/boards/${boardId}/columns/${columnId}/cards/${_id}`,
        {
          title,
          description,
          order,
          ...(status !== undefined && { status }),
        },
      );
      return {
        ...response.data.data,
        boardId,
        columnId,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (
    {
      cardId,
      boardId,
      columnId,
    }: { cardId: string; boardId: string; columnId: string },
    thunkAPI,
  ) => {
    try {
      await axiosInstance.delete(
        `/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
      );
      return { cardId, columnId, boardId };
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  },
);
