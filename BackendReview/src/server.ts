import type { NextFunction, Request, Response } from "express";
import express from "express";
import z, { ZodError } from "zod";
import { AppError } from "./exceptions/app-error.js";
import { myMiddleware } from "./middlewares/my-middleware.js";
import { routes } from "./routes/index.js";

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(routes);
app.use(myMiddleware);

app.get("/", (_request, response) => {
  response.send("Hello World Express!");
});

app.use(
  (error: any, _request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return response
        .status(400)
        .json({ message: "Erro de validação", issues: z.treeifyError(error) });
    }

    response.status(500).json({ message: error.message });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando ➡ http://localhost:${PORT}`);
});
