import type { NextFunction, Request, Response } from "express";

export function myMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {  
  console.log("Middleware executado!");

  return next();
}
