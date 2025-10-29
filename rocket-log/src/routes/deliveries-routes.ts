import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthentication } from "@/middlewares/ensure-authentication";
import { Router } from "express";

export const deliveriesRoutes = Router();

const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthentication);
deliveriesRoutes.post("/", deliveriesController.create);
