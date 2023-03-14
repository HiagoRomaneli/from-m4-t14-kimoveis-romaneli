import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import {
  ICategory,
  ICategoryReturn,
} from "../../interfaces/category.interfaces";
import { createCategoriesSchemaReturn } from "../../schemas/category.schemas";

export const createCategoriesService = async (
  categoryData: ICategory
): Promise<ICategoryReturn> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategory = await categoryRepository.findOne({
    where: {
      name: categoryData.name,
    },
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory = createCategoriesSchemaReturn.parse(category);

  return newCategory;
};
