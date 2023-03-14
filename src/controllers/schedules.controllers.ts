import { Request, Response } from "express";
import { ISchedules } from "../interfaces/schedules.interfaces";
import { createSchedulesService } from "../services/schedule/createSchedules.services";
import { listSchedulesService } from "../services/schedule/listSchedules.services";

export const createScheduleController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const scheduleData: ISchedules = request.body;
  const userId: number = request.user.id;

  await createSchedulesService(scheduleData, userId);

  return response.status(201).json({
    message: "Schedule created",
  });
};

export const listSchedulesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateId: number = parseInt(request.params.id);

  const schdules = await listSchedulesService(realEstateId);

  return response.json(schdules);
};
