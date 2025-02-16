import mongoose from "mongoose";
import { Board } from "../models/Board";

export const boardsService = {
  async getAllBoards() {
    return await Board.find({}).sort({ createdAt: -1 });
  },

  async getBoardById(boardId: string) {
    return await Board.findById(boardId);
  },

  async createBoard(data: { name: string }) {
    const board = new Board({
      name: data.name,
    });
    return await board.save();
  },

  async updateBoard(boardId: string, data: { name: string }) {
    return await Board.findOneAndUpdate(
      { _id: boardId },
      { name: data.name },
      { new: true },
    );
  },

  async deleteBoard(boardId: string) {
    return await Board.findByIdAndDelete(boardId);
  },

  async addCard(
    boardId: string,
    columnId: string,
    cardData: { title: string; description: string },
  ) {
    const board = await Board.findById(boardId);
    if (!board) {
      console.log("Board not found:", boardId);
      return null;
    }

    const column = board.columns.find(
      (col) => col.id.toLowerCase() === columnId.toLowerCase(),
    );
    if (!column) {
      console.log("Column not found:", columnId);
      return null;
    }

    const newCard = {
      _id: new mongoose.Types.ObjectId(),
      title: cardData.title,
      description: cardData.description,
      order: column.cards.length,
      status: column.name,
    };

    column.cards.push(newCard);
    await board.save();

    return {
      id: newCard._id.toString(),
      title: newCard.title,
      description: newCard.description,
      order: newCard.order,
      status: newCard.status,
      boardId,
      columnId: column.id,
    };
  },

  async updateCard(
    boardId: string,
    columnId: string,
    cardId: string,
    updates: {
      title?: string;
      description?: string;
      order?: number;
      status?: string;
    },
  ) {
    const board = await Board.findById(boardId);
    if (!board) {
      console.log("Board not found:", boardId);
      return null;
    }

    const sourceColumn = board.columns.find(
      (col) => col.id.toLowerCase() === columnId.toLowerCase(),
    );
    if (!sourceColumn) {
      console.log("Source column not found:", columnId);
      return null;
    }

    const cardIndex = sourceColumn.cards.findIndex(
      (card) => card._id.toString() === cardId,
    );
    if (cardIndex === -1) {
      console.log("Card not found:", cardId);
      return null;
    }

    const card = sourceColumn.cards[cardIndex];

    if (updates.status) {
      const targetColumn = board.columns.find(
        (col) => col.id === updates.status,
      );
      if (!targetColumn) {
        console.log("Target column not found:", updates.status);
        return null;
      }

      sourceColumn.cards.splice(cardIndex, 1);

      const updatedCard = {
        ...card.toObject(),
        status: updates.status,
        order: targetColumn.cards.length,
      };

      if (updates.title) updatedCard.title = updates.title;
      if (updates.description) updatedCard.description = updates.description;
      if (updates.order !== undefined) updatedCard.order = updates.order;

      targetColumn.cards.push(updatedCard);
      await board.save();

      return {
        id: updatedCard._id.toString(),
        title: updatedCard.title,
        description: updatedCard.description,
        order: updatedCard.order,
        status: updatedCard.status,
        boardId,
        columnId: targetColumn.id,
      };
    } else {
      if (updates.title) card.title = updates.title;
      if (updates.description) card.description = updates.description;
      if (updates.order !== undefined) card.order = updates.order;

      await board.save();

      return {
        id: card._id.toString(),
        title: card.title,
        description: card.description,
        order: card.order,
        status: card.status,
        boardId,
        columnId,
      };
    }
  },

  async deleteCard(boardId: string, columnId: string, cardId: string) {
    const board = await Board.findById(boardId);
    if (!board) return null;

    const column = board.columns.find((col) => col.id === columnId);
    if (!column) return null;

    const cardIndex = column.cards.findIndex(
      (card) => card._id.toString() === cardId,
    );
    if (cardIndex === -1) return null;

    const deletedCard = column.cards.splice(cardIndex, 1)[0];
    await board.save();
    return deletedCard._id.toString();
  },
};
