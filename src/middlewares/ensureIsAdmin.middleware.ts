import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authAdmin: boolean = request.user.admin;

  if (authAdmin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
