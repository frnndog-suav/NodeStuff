import type { NextFunction, Request, Response } from "express";

export function specificMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("Middleware específico executado!");

  return next();
}
