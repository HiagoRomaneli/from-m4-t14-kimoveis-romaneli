import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IAllUsersReturn } from "../../interfaces/users.interfaces";
import { AllUsersReturn } from "../../schemas/users.schemas";

export const listUsersService = async (): Promise<IAllUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepository.find();

  const users = AllUsersReturn.parse(findUsers);

  return users;
};
