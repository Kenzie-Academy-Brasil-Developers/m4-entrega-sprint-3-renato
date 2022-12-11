import { Router } from "express";
import {
  deleteCategorieController,
  editCategorieController,
  getCategoriesController,
  postCategoriesController,
  retrieveCategorieController,
} from "../controllers/categories.controller.js";
import { ensureCategorieExistsMiddleware } from "../middlewares/categories/ensureCategorieExists.js";
import { SchemaMiddleware } from "../middlewares/schema.middleware.js";
import { categorieShape } from "../schemas/categories/createCategorie.schema.js";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  SchemaMiddleware(categorieShape),
  postCategoriesController
);

categoriesRoutes.get("", getCategoriesController);

categoriesRoutes.get(
  "/:id",
  ensureCategorieExistsMiddleware,
  retrieveCategorieController
);

categoriesRoutes.patch(
  "/:id",
  SchemaMiddleware(categorieShape),
  ensureCategorieExistsMiddleware,
  editCategorieController
);

categoriesRoutes.delete(
  "/:id",
  ensureCategorieExistsMiddleware,
  deleteCategorieController
);

export default categoriesRoutes;
