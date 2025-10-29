import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes/_index";

export const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);
