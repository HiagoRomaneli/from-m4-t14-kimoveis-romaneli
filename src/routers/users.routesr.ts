import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { CreateUsersSchema, UpdateUsersSchema } from "../schemas/users.schemas";
export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(CreateUsersSchema),
  ensureEmailExistsMiddleware,
  createUsersController
);
usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listUsersController
);
usersRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureDataIsValidMiddleware(UpdateUsersSchema),
  ensureEmailExistsMiddleware,
  updateUsersController
);
usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureIsAdminMiddleware,
  deleteUsersController
);
