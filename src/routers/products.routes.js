import { Router } from "express";
import { createProductShape } from "../schemas/products/createProduct.schema.js";
import { SchemaMiddleware } from "../middlewares/schema.middleware.js";
import {
  deleteProductController,
  editProductController,
  getAllProductsController,
  postProductController,
  retrieveProductController,
  searchBycategorieController,
} from "../controllers/products.controller.js";
import { ensureProductExistsMiddleware } from "../middlewares/products/ensureProductExists.js";
import { ensureCategorieExistsMiddleware } from "../middlewares/categories/ensureCategorieExists.js";

const productsRoutes = Router();

productsRoutes.post(
  "",
  SchemaMiddleware(createProductShape),
  postProductController
);

productsRoutes.get("", getAllProductsController);

productsRoutes.get(
  "/:uuid",
  ensureProductExistsMiddleware,
  retrieveProductController
);

productsRoutes.get(
  "/category/:id",
  ensureCategorieExistsMiddleware,
  searchBycategorieController
);

productsRoutes.patch(
  "/:uuid",
  ensureProductExistsMiddleware,
  editProductController
);

productsRoutes.delete(
  "/:uuid",
  ensureProductExistsMiddleware,
  deleteProductController
);

export { productsRoutes };
