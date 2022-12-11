import "express-async-errors";

import { errorHandler } from "./errors.js";

import express from "express";

import categoriesRoutes from "./routers/categories.routes.js";

import { productsRoutes } from "./routers/products.routes.js";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.use("/products", productsRoutes);

app.use(errorHandler);

export default app;
