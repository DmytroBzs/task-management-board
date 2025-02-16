import { Router } from "express";
import { validateBody } from "../middlewares/validateBody";
import { boardSchema, cardSchema } from "../validation/boards";
import { boardsController } from "../controllers/boards";
import { isValidId } from "../middlewares/isValidId";
import { ctrlWrapper } from "../utils/ctrlWrapper";
const router = Router();

router.get("/", ctrlWrapper(boardsController.getBoards));
router.get("/:boardId", ctrlWrapper(boardsController.getBoardById));
router.post(
  "/",
  validateBody(boardSchema),
  ctrlWrapper(boardsController.createBoard),
);
router.delete(
  "/:boardId",
  isValidId,
  ctrlWrapper(boardsController.deleteBoard),
);

router.post(
  "/:boardId/columns/:columnId/cards",
  validateBody(cardSchema),
  ctrlWrapper(boardsController.addCard),
);
router.patch(
  "/:boardId/columns/:columnId/cards/:cardId",
  ctrlWrapper(boardsController.updateCard),
);
router.delete(
  "/:boardId/columns/:columnId/cards/:cardId",
  ctrlWrapper(boardsController.deleteCard),
);

export default router;
