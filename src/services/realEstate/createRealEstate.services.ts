import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  IRealEstate,
  IRealEstateReturn,
} from "../../interfaces/realEstate.interfaces";

export const createRealEstateService = async (
  realEstateData: IRealEstate
): Promise<IRealEstateReturn> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const findCategory: Category | null = await categoryRepository.findOne({
    where: {
      id: Number(realEstateData.categoryId),
    },
  });

  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }

  const findAddress: Address | null = await addressRepository
    .createQueryBuilder("address")
    .where("address.street = :street", {
      street: realEstateData.address.street,
    })
    .andWhere("address.zipCode = :zipCode", {
      zipCode: realEstateData.address.zipCode,
    })
    .andWhere("address.number = :number", {
      number: realEstateData.address.number,
    })
    .getOne();

  if (findAddress) {
    throw new AppError("Address already exists", 409);
  }

  const addAddress: Address = addressRepository.create({
    ...realEstateData.address,
  });

  await addressRepository.save(addAddress);

  const realEstate: RealEstate = realEstateRepository.create({
    ...realEstateData,
    address: addAddress,
    category: findCategory,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};
