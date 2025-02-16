import { Request, Response } from "express";
import createHttpError from "http-errors";
import { boardsService } from "../services/boards";

export const boardsController = {
  async getBoards(req: Request, res: Response) {
    const boards = await boardsService.getAllBoards();
    res.json({
      status: 200,
      message: "Successfully retrieved boards",
      data: boards,
    });
  },

  async createBoard(req: Request, res: Response) {
    const board = await boardsService.createBoard(req.body);
    res.status(201).json({
      status: 201,
      message: "Successfully created board",
      data: board,
    });
  },

  async deleteBoard(req: Request, res: Response) {
    const { boardId } = req.params;
    const result = await boardsService.deleteBoard(boardId);

    if (!result) {
      throw createHttpError(404, "Board not found");
    }

    res.json({
      status: 200,
      message: "Successfully deleted board",
      data: boardId,
    });
  },

  async getBoardById(req: Request, res: Response) {
    const { boardId } = req.params;
    const board = await boardsService.getBoardById(boardId);

    if (!board) {
      throw createHttpError(404, "Board not found");
    }

    res.json({
      status: 200,
      message: "Successfully fetched board",
      data: board,
    });
  },

  async addCard(req: Request, res: Response) {
    const { boardId, columnId } = req.params;
    console.log("Adding card:", { boardId, columnId, body: req.body });

    const card = await boardsService.addCard(boardId, columnId, req.body);

    if (!card) {
      console.log("Failed to add card");
      throw createHttpError(404, "Board or column not found");
    }

    res.status(201).json({
      status: 201,
      message: "Successfully added card",
      data: card,
    });
  },

  async updateCard(req: Request, res: Response) {
    const { boardId, columnId, cardId } = req.params;
    const updates = req.body;

    const card = await boardsService.updateCard(
      boardId,
      columnId,
      cardId,
      updates,
    );

    if (!card) {
      throw createHttpError(404, "Card not found");
    }

    res.json({
      status: 200,
      message: "Successfully updated card",
      data: card,
    });
  },

  async deleteCard(req: Request, res: Response) {
    const { boardId, columnId, cardId } = req.params;
    const result = await boardsService.deleteCard(boardId, columnId, cardId);

    if (!result) {
      throw createHttpError(404, "Card not found");
    }

    res.json({
      status: 200,
      message: "Successfully deleted card",
      data: cardId,
    });
  },
};
