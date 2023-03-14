import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  AllUsersReturn,
  CreateUsersSchema,
  UpdateUsersSchema,
  UsersSchemaWithoutPassword,
} from "../schemas/users.schemas";

export type IUser = z.infer<typeof CreateUsersSchema>;
export type IUserUpdate = DeepPartial<typeof UpdateUsersSchema>;
export type IUserReturn = z.infer<typeof UsersSchemaWithoutPassword>;
export type IAllUsersReturn = z.infer<typeof AllUsersReturn>;
