import { z } from "zod";
import {
  allCategories,
  createCategoriesSchemaReturn,
  createCategoriesSchema,
} from "../schemas/category.schemas";

export type ICategory = z.infer<typeof createCategoriesSchema>;
export type ICategoryReturn = z.infer<typeof createCategoriesSchemaReturn>;
export type IAllCategoryReturn = z.infer<typeof allCategories>;
