import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const ensureEmailExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const email = request.body.email;

  if (!email) {
    return next();
  }

  const findEmail = await userRepository.findOneBy({
    email: email,
  });

  if (findEmail) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
