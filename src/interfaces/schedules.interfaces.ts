import { z } from "zod";
import {
  createSchedulesSchema,
  createSchedulesSchemaReturn,
} from "../schemas/schedules.schema";

export type ISchedules = z.infer<typeof createSchedulesSchema>;
export type ISchedulesReturn = z.infer<typeof createSchedulesSchemaReturn>;
