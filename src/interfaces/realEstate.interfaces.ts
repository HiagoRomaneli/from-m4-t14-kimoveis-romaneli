import { z } from "zod";
import {
  allRealEstateReturn,
  createRealEstateSchema,
  createRealEstateSchemaReturn,
} from "../schemas/reatEstate.schemas";

export type IRealEstate = z.infer<typeof createRealEstateSchema>;
export type IRealEstateReturn = z.infer<typeof createRealEstateSchemaReturn>;
export type IAllRealEstate = z.infer<typeof allRealEstateReturn>;
