import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { ISchedules } from "../../interfaces/schedules.interfaces";

export const createSchedulesService = async (
  scheduleData: ISchedules,
  userId: number
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const scheduleFilterDateHourRealEstate = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date: scheduleData.date })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .andWhere("schedule.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .getOne();

  if (scheduleFilterDateHourRealEstate) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const scheduleFilterDateHourUser = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date: scheduleData.date })
    .andWhere("schedule.hour = :hour", { hour: scheduleData.hour })
    .andWhere("schedule.user = :user", { user: userId })
    .getOne();

  if (scheduleFilterDateHourUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (scheduleData.hour < "08:00" || scheduleData.hour > "18:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const date = new Date(scheduleData.date);

  const weekDay = date.getDay();

  if (weekDay === 6 || weekDay === 0) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: scheduleData.realEstateId,
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const findUser: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const schedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: findRealEstate,
    user: findUser!,
  });

  await scheduleRepository.save(schedule);
};
