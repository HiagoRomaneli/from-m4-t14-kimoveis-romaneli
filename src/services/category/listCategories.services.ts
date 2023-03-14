import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { IAllCategoryReturn } from "../../interfaces/category.interfaces";

export const listCategoriesService = async (): Promise<IAllCategoryReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const allCategories: IAllCategoryReturn = await categoryRepository.find();

  return allCategories;
};
