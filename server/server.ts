import express from "express";
import pino from "pino-http";
import cors from "cors";
import { Request, Response } from "express";
import { getEnvVar } from "./src/utils/getEnvVar";
import { notFoundHandler } from "./src/middlewares/notFoundHandler";
import { errorHandler } from "./src/middlewares/errorHandler";
import boardsRouter from "./src/routes/boards";

const PORT = Number(getEnvVar("PORT", "3000"));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );

  app.get("/", (req: Request, res: Response) => {
    res.json({
      message:
        "Welcome to the Task Management API. Ready to serve your requests!",
    });
  });

  app.use("/boards", boardsRouter);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (error?: Error) => {
    if (error) {
      console.error("Server startup error:", error);
    }
    console.log(`🚀 Server is running on ${PORT}`);
  });
};
