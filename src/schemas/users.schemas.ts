import { z } from "zod";

export const CreateUsersSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().min(4).max(120),
});

export const CreateUsersSchemaReturn = CreateUsersSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const UsersSchemaWithoutPassword = CreateUsersSchemaReturn.omit({
  password: true,
});

export const AllUsersReturn = z.array(UsersSchemaWithoutPassword);

export const UpdateUsersSchema = CreateUsersSchema.omit({
  admin: true,
}).partial();
