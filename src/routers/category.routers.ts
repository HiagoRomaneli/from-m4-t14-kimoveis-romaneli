import { Router } from "express";
import {
  createCategoriesController,
  listCategoriesController,
  listRealEstatesByCategoryIdController,
} from "../controllers/category.controllers";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  createCategoriesController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/realEstate", listRealEstatesByCategoryIdController);
