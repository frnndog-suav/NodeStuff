import { NextFunction, Request, Response } from "express";

export class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction) {
    return response.json();
  }
}
