import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces";
import { UsersSchemaWithoutPassword } from "../../schemas/users.schemas";

export const updateUsersService = async (
  userData: IUserUpdate,
  userId: number
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const user = userRepository.create({
    ...oldUser,
    ...userData,
  });

  await userRepository.save(user);

  const updatedUser = UsersSchemaWithoutPassword.parse(user);

  return updatedUser;
};
