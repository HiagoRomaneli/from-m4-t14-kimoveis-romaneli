import { Request, Response } from "express";
import { IUser, IUserUpdate } from "../interfaces/users.interfaces";
import { createUsersServices } from "../services/users/createUsers.services";
import { deleteUsersService } from "../services/users/deleteUser.services";
import { listUsersService } from "../services/users/listUsers.services";
import { updateUsersService } from "../services/users/updateUsers.services";

export const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: IUser = request.body;

  const newUser = await createUsersServices(userData);

  return response.status(201).json(newUser);
};

export const listUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await listUsersService();

  return response.json(users);
};

export const updateUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: IUserUpdate = request.body;
  const userId: number = parseInt(request.params.id);

  const updateUser = await updateUsersService(userData, userId);

  return response.json(updateUser);
};

export const deleteUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  await deleteUsersService(userId);

  return response.status(204).send();
};
