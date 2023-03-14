import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

export const listRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findRealEstate: Array<RealEstate> = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return findRealEstate;
};
