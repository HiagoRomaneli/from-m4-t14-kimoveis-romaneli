import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

export const listSchedulesService = async (realEstateId: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const realEstate: RealEstate | null = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  return realEstate;
};
