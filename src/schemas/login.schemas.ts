import { z } from "zod";

export const createLoginSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().min(4).max(120),
});
