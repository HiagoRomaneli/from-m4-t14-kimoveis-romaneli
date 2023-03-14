import { z } from "zod";

export const createSchedulesSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const createSchedulesSchemaReturn = createSchedulesSchema.extend({
  id: z.number(),
  userId: z.number(),
});
