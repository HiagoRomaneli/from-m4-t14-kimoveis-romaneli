import { z } from "zod";

export const createAddressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(6).nullable().optional(),
  city: z.string().max(20),
  state: z.string().max(2),
});

export const createAddressSchemaReturn = createAddressSchema.extend({
  id: z.number(),
});
