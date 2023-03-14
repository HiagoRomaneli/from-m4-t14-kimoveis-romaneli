import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUser, IUserReturn } from "../../interfaces/users.interfaces";
import { UsersSchemaWithoutPassword } from "../../schemas/users.schemas";

export const createUsersServices = async (
  userData: IUser
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = UsersSchemaWithoutPassword.parse(user);

  return newUser;
};
