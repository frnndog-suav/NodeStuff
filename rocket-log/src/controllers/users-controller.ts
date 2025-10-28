import { NextFunction, Request, Response } from "express";

export class UsersController {
  create(req: Request, res: Response, next: NextFunction) {
    return res.json({ message: "OKay" });
  }
}
