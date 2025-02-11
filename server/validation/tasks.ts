import Joi from "joi";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(50),
  status: Joi.string().valid("ToDo", "InProgress", "Done").required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(50),
  status: Joi.string().valid("ToDo", "InProgress", "Done"),
});
