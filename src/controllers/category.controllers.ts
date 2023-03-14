import { Request, Response } from "express";
import {
  IAllCategoryReturn,
  ICategory,
} from "../interfaces/category.interfaces";
import { createCategoriesService } from "../services/category/createCategories.services";
import { listCategoriesService } from "../services/category/listCategories.services";
import { listRealEstatesByCategoryIdService } from "../services/category/listRealEstatesByCategoryId.services";

export const createCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryData: ICategory = request.body;

  const newCategory = await createCategoriesService(categoryData);

  return response.status(201).json(newCategory);
};

export const listCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const allCategories: IAllCategoryReturn = await listCategoriesService();

  return response.status(200).json(allCategories);
};

export const listRealEstatesByCategoryIdController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryId: number = parseInt(request.params.id);

  const allRealEstates = await listRealEstatesByCategoryIdService(categoryId);

  return response.status(200).json(allRealEstates);
};
