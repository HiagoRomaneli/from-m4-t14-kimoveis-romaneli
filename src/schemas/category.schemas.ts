import { z } from "zod";

export const createCategoriesSchema = z.object({
  name: z.string().max(45),
});

export const createCategoriesSchemaReturn = createCategoriesSchema.extend({
  id: z.number(),
});

export const allCategories = z.array(createCategoriesSchemaReturn);
