import type { Request, Response } from "express";
import z from "zod";

export class ProductsController {
  find(request: Request, response: Response) {
    const { id } = request.params;

    response.send(`Produto solicitado: ${id}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
    });

    const { name, price } = bodySchema.parse(request.body);

    // if (!name) {
    //   throw new AppError("Nome é obrigatório");
    // }

    // if (!price) {
    //   throw new AppError("Preço é obrigatório");
    // }

    // throw new Error("Erro proposital para testar o middleware de erro");
    // throw new AppError('Erro classe AppError')

    //   response.send(`Produto criado: ${name}, Preço: ${price}`);

    response.status(201).json({
      message: `Produto criado: ${name}, Preço: ${price}`,
    });
  }
}
