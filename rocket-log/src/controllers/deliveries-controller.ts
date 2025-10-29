import { NextFunction, Request, Response } from "express";

export class DeliveriesController {
  create(request: Request, response: Response, next: NextFunction) {
    return response.json({ message: "tudo certo" });
  }
}
