import { Router } from "express";
import {
  getTasksController,
  getTaskByIdController,
  createTaskController,
  patchTaskController,
  deleteTaskController,
} from "../controllers/tasks";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { validateBody } from "../middlewares/validateBody";
import { createTaskSchema, updateTaskSchema } from "../validation/tasks";
import { isValidId } from "../middlewares/isValidId";

const router = Router();
router.get("/tasks", ctrlWrapper(getTasksController));

router.get("/tasks/:taskId", isValidId, ctrlWrapper(getTaskByIdController));

router.post(
  "/tasks",
  validateBody(createTaskSchema),
  ctrlWrapper(createTaskController),
);

router.patch(
  "/tasks/:taskId",
  isValidId,
  validateBody(updateTaskSchema),
  ctrlWrapper(patchTaskController),
);

router.delete("/tasks/:taskId", isValidId, ctrlWrapper(deleteTaskController));

export default router;
