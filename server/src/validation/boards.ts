import Joi from "joi";

export const boardSchema = Joi.object({
  name: Joi.string().required().min(1).max(100),
});

export const cardSchema = Joi.object({
  title: Joi.string().required().min(1).max(100),
  description: Joi.string().required().min(1).max(500),
  order: Joi.number(),
  status: Joi.string().valid("ToDo", "InProgress", "Done"),
});
