import { Router } from "express";
import { ProductsController } from "../controllers/products-controller.js";
import { specificMiddleware } from "../middlewares/specific-middleware.js";

export const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/:id", productsController.find);

productsRoutes.get("/:id/:user", (request, response) => {
  const { id, user } = request.params;

  response.send(`Produto solicitado: ${id} por ${user}`);
});

productsRoutes.get("/", (request, response) => {
  const { page, pageSize } = request.query;

  response.send(`Página: ${page}, Tamanho da Página: ${pageSize}`);
});

productsRoutes.post("/", specificMiddleware, productsController.create);
