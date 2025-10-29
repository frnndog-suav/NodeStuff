import { Router } from "express";
import { deliveriesRoutes } from "./deliveries-routes";
import { sessionRoutes } from "./sessions-routes";
import { usersRoutes } from "./users-routes";

export const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/deliveries", deliveriesRoutes);
