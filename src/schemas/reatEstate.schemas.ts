import { z } from "zod";
import { createAddressSchema } from "./adress.schemas";
import { createCategoriesSchemaReturn } from "./category.schemas";

export const createRealEstateSchema = z.object({
  categoryId: z.number(),
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  address: createAddressSchema,
});

export const createRealEstateSchemaReturn = createRealEstateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sold: z.boolean().default(false),
    category: createCategoriesSchemaReturn,
  })
  .omit({ categoryId: true });

export const allRealEstateReturn = createRealEstateSchemaReturn.array();

export const returnRealEstateByCategory = createCategoriesSchemaReturn.extend({
  realEstate: allRealEstateReturn,
});
