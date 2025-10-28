import { SessionsController } from "@/controllers/sessions-controller";
import { Router } from "express";

export const sessionRoutes = Router();

const sessionController = new SessionsController();

sessionRoutes.post("/", sessionController.create);
