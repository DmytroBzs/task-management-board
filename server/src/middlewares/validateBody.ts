import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationError } from "joi";

export const validateBody =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Received request body:", req.body);
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      req.body = validatedBody;
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const error = createHttpError(400, "Bad Request", {
          errors: err.details,
        });
        next(error);
      } else {
        next(err);
      }
    }
  };
