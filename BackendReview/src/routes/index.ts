import { Router } from "express";
import { healthCheckRoutes } from "./health-check-routes.js";

export const routes = Router();

routes.use("/health-check", healthCheckRoutes);
// routes.use("/product", productsRoutes);
// routes.use("/player", playersRoutes);
// routes.use("/player-save", playerSavesRoutes);
